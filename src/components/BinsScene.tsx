import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const BIN_COUNT = 41
const CENTER_BIN = 20
const BIN_WIDTH = 0.16
// World-space box the bins and shorts occupy on screen, padded for the sway.
const SCENE_WIDTH = 6.8
const SCENE_HEIGHT = 2.6
// At lg the canvas spans the whole hero, so the scene sits in the right half beside the copy.
const WIDE_MIN_PX = 1024
// ponytail: illustrative scale only, not a live position
const SOL_PER_UNIT_HEIGHT = 12.4

const liquidityShape = (i: number) => 0.2 + 1.35 * Math.exp(-(((i - CENTER_BIN) / 10) ** 2))

type Readout = { activeBin: number; solHeld: number }

export function BinsScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [readout, setReadout] = useState<Readout>({ activeBin: CENTER_BIN, solHeld: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.OrthographicCamera()
    camera.position.set(3.2, 2.4, 9)
    camera.lookAt(0, 0.15, 0)

    const cyan = new THREE.Color('#22d3ee')
    const violet = new THREE.Color('#7c3aed')
    const purple = new THREE.Color('#a78bfa')
    const usdcGrey = new THREE.Color('#3a3e47')
    const white = new THREE.Color('#ffffff')
    const black = new THREE.Color(0)

    const barGeometry = new THREE.BoxGeometry(BIN_WIDTH * 0.8, 1, 0.45)
    barGeometry.translate(0, 0.5, 0)
    const shortGeometry = barGeometry.clone()
    shortGeometry.translate(0, -1, 0)

    const bars: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = []
    const shorts: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = []
    for (let i = 0; i < BIN_COUNT; i++) {
      const x = (i - (BIN_COUNT - 1) / 2) * BIN_WIDTH
      const bar = new THREE.Mesh(barGeometry, new THREE.MeshStandardMaterial({ color: usdcGrey, metalness: 0.2, roughness: 0.45 }))
      bar.position.x = x
      scene.add(bar)
      bars.push(bar)
      const short = new THREE.Mesh(
        shortGeometry,
        new THREE.MeshStandardMaterial({ color: purple, transparent: true, opacity: 0.7, roughness: 0.3, emissive: violet, emissiveIntensity: 0.5 }),
      )
      short.position.x = x
      scene.add(short)
      shorts.push(short)
    }

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(BIN_COUNT * BIN_WIDTH + 0.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03, side: THREE.DoubleSide }),
    )
    floor.rotation.x = -Math.PI / 2
    scene.add(floor)
    const grid = new THREE.GridHelper(30, 190, 0x22262d, 0x16181c)
    grid.position.y = -1.5
    scene.add(grid)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const sun = new THREE.DirectionalLight(0xffffff, 1.6)
    sun.position.set(3, 6, 4)
    scene.add(sun)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      renderer.setSize(w, h, false)
      const aspect = w / h
      const wide = w >= WIDE_MIN_PX
      // Wide: scene in the right half, raised clear of the readout card.
      const widthFraction = wide ? 0.55 : 0.92
      const heightFraction = wide ? 0.45 : 0.8
      const centerX = wide ? 0.7 : 0.5
      const centerY = wide ? 0.42 : 0.5
      const viewWidth = Math.max(SCENE_WIDTH / widthFraction, (SCENE_HEIGHT / heightFraction) * aspect)
      const viewHeight = viewWidth / aspect
      camera.left = -centerX * viewWidth
      camera.right = (1 - centerX) * viewWidth
      camera.top = centerY * viewHeight
      camera.bottom = -(1 - centerY) * viewHeight
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    resize()
    addEventListener('resize', resize)

    // Reduced motion renders one frame, so it snaps to final values instead of easing.
    const ease = reduced ? 1 : 0.1
    let smoothedActive = CENTER_BIN
    let lastActive = -1
    let raf = 0
    const start = performance.now()
    const frame = (now: number) => {
      const t = (now - start) / 1000
      const target = CENTER_BIN + Math.sin(t * 0.32) * 9 + Math.sin(t * 1.1) * 1.5
      smoothedActive += (target - smoothedActive) * 0.06
      const active = Math.round(smoothedActive)
      let solUnits = 0
      bars.forEach((bar, i) => {
        const h = liquidityShape(i)
        const holdsSol = i > active
        const isActive = i === active
        bar.scale.y += ((holdsSol || isActive ? h : h * 0.85) - bar.scale.y) * ease
        bar.material.color.lerp(isActive ? white : holdsSol ? cyan : usdcGrey, reduced ? 1 : 0.12)
        bar.material.emissive.copy(isActive ? cyan : black).multiplyScalar(isActive ? 0.6 : 0)
        if (holdsSol) solUnits += h
        if (isActive) solUnits += h / 2
        const shortHeight = holdsSol ? h * 0.8 : isActive ? h * 0.4 : 0.001
        shorts[i].scale.y += (shortHeight - shorts[i].scale.y) * ease
      })
      if (active !== lastActive) {
        lastActive = active
        setReadout({ activeBin: active, solHeld: solUnits * SOL_PER_UNIT_HEIGHT })
      }
      scene.rotation.y = Math.sin(t * 0.15) * 0.12
      renderer.render(scene, camera)
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      renderer.dispose()
      pmrem.dispose()
    }
  }, [])

  const sol = readout.solHeld.toFixed(1)
  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="block h-[340px] w-full sm:h-[460px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_55%,transparent_100%)] lg:h-full lg:[mask-image:radial-gradient(ellipse_50%_55%_at_70%_42%,#000_55%,transparent_100%)]"
        aria-label="Animated Meteora DLMM liquidity bins. Bins above the floor hold SOL or USDC. Purple bars below mirror the hedge short."
      />
      <div className="ml-auto mt-4 w-64 rounded-2xl border border-white/10 bg-surface-800/75 p-4 backdrop-blur lg:absolute lg:bottom-16 lg:right-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:mt-0">
        <p className="mb-2 font-mono text-xs text-text-muted">Illustrative position</p>
        <dl className="font-mono text-[13px] font-medium tabular-nums">
          <div className="flex justify-between py-1.5"><dt className="text-text-secondary">Active bin</dt><dd>#{8400 + readout.activeBin}</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-[#22d3ee]">SOL held</dt><dd>{sol} SOL</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-[#a78bfa]">Perp short</dt><dd>−{sol} SOL</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt>Net exposure</dt><dd>≈ 0.0 SOL</dd></div>
        </dl>
        <ul className="mt-3 flex gap-3 border-t border-white/10 pt-3 font-mono text-[11px] text-text-muted">
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#22d3ee]" />SOL bins</li>
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#3a3e47]" />USDC bins</li>
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#a78bfa]" />Short</li>
        </ul>
      </div>
    </div>
  )
}
