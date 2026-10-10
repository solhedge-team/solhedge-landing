import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

const BIN_COUNT = 61
const CENTER_BIN = 30
const BIN_WIDTH = 0.13
const RANGE_HALF = 15
// Re-centre once the active bin is this close to the range edge.
const RANGE_EDGE_BINS = 3
// World-space box the bins and shorts occupy on screen, padded for the sway.
const SCENE_WIDTH = 8.6
const SCENE_HEIGHT = 3.2
// At lg the canvas spans the whole hero, so the scene sits in the right half beside the copy.
const WIDE_MIN_PX = 1024
// Matches --color-surface-900; the canvas is opaque so bloom has a background to bleed into.
const PAGE_BG = '#08090a'
// ponytail: illustrative scale and fee rate only, not a live position or strategy
const SOL_PER_UNIT_HEIGHT = 8.6
const FEE_SOL_PER_BIN_CROSS = 0.012
const CENTER_PRICE_USD = 155
const BIN_STEP_BPS = 25
const SPARK_COUNT = 160

const xOf = (i: number) => (i - CENTER_BIN) * BIN_WIDTH
const priceUsdAt = (bin: number) => CENTER_PRICE_USD * (1 + BIN_STEP_BPS / 10_000) ** (bin - CENTER_BIN)
const usd = (priceUsd: number) => `$${priceUsd.toFixed(2)}`
const price = (t: number) => CENTER_BIN + Math.sin(t * 0.21) * 17 + Math.sin(t * 0.67) * 4 + Math.sin(t * 1.9) * 0.8

type Readout = { priceUsd: number; rangeLowUsd: number; rangeHighUsd: number; solHeld: number; feesSol: number; rangeMoves: number }

export function BinsScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rangeLowRef = useRef<HTMLSpanElement>(null)
  const rangeHighRef = useRef<HTMLSpanElement>(null)
  const priceRef = useRef<HTMLSpanElement>(null)
  const [readout, setReadout] = useState<Readout>({
    priceUsd: CENTER_PRICE_USD,
    rangeLowUsd: priceUsdAt(CENTER_BIN - RANGE_HALF),
    rangeHighUsd: priceUsdAt(CENTER_BIN + RANGE_HALF),
    solHeld: 0,
    feesSol: 0,
    rangeMoves: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const rangeLowLabel = rangeLowRef.current
    const rangeHighLabel = rangeHighRef.current
    const priceLabel = priceRef.current
    if (!canvas || !rangeLowLabel || !rangeHighLabel || !priceLabel) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    // Bloom and parallax only where there's a mouse; touch devices keep the cheaper single pass.
    const finePointer = matchMedia('(pointer: fine)').matches

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(PAGE_BG)
    scene.fog = new THREE.Fog(PAGE_BG, 7, 15)
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.OrthographicCamera()
    const cameraBase = new THREE.Vector3(3.2, 2.4, 9)
    const lookAt = new THREE.Vector3(0, 0.15, -0.6)
    camera.position.copy(cameraBase)
    camera.lookAt(lookAt)

    const cyan = new THREE.Color('#22d3ee')
    const violet = new THREE.Color('#7c3aed')
    const purple = new THREE.Color('#a78bfa')
    const usdcGrey = new THREE.Color('#3a3e47')
    const outOfRange = new THREE.Color('#15171b')
    const white = new THREE.Color('#ffffff')
    const green = new THREE.Color('#4ade80')

    const root = new THREE.Group()
    scene.add(root)
    const barGeometry = new THREE.BoxGeometry(BIN_WIDTH * 0.8, 1, 0.45)
    barGeometry.translate(0, 0.5, 0)
    const shortGeometry = barGeometry.clone()
    shortGeometry.translate(0, -1, 0)
    const edgeGeometry = new THREE.EdgesGeometry(barGeometry)

    const bars: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = []
    const shorts: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = []
    const edges: THREE.LineSegments<THREE.EdgesGeometry, THREE.LineBasicMaterial>[] = []
    for (let i = 0; i < BIN_COUNT; i++) {
      const bar = new THREE.Mesh(barGeometry, new THREE.MeshStandardMaterial({ color: usdcGrey.clone(), metalness: 0.2, roughness: 0.45 }))
      bar.position.x = xOf(i)
      bar.scale.y = 0.01
      root.add(bar)
      bars.push(bar)
      const short = new THREE.Mesh(
        shortGeometry,
        new THREE.MeshStandardMaterial({ color: purple, transparent: true, opacity: 0.7, roughness: 0.3, emissive: violet, emissiveIntensity: 0.9 }),
      )
      short.position.x = xOf(i)
      short.scale.y = 0.001
      root.add(short)
      shorts.push(short)
      const edge = new THREE.LineSegments(edgeGeometry, new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0 }))
      edge.position.x = xOf(i)
      root.add(edge)
      edges.push(edge)
    }

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(BIN_COUNT * BIN_WIDTH + 0.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03, side: THREE.DoubleSide }),
    )
    floor.rotation.x = -Math.PI / 2
    // Drawn after the see-through shorts and without depth, so it tints them the same way every frame.
    floor.material.depthWrite = false
    floor.renderOrder = 1
    root.add(floor)
    const grid = new THREE.GridHelper(30, 190, 0x22262d, 0x16181c)
    grid.position.y = -1.5
    scene.add(grid)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const sun = new THREE.DirectionalLight(0xffffff, 1.6)
    sun.position.set(3, 6, 4)
    scene.add(sun)

    // Fee sparks: a pool of "$" sprites that rise from the active bin and fade.
    const dollarCanvas = document.createElement('canvas')
    dollarCanvas.width = dollarCanvas.height = 64
    const dollarCtx = dollarCanvas.getContext('2d')
    if (dollarCtx) {
      dollarCtx.fillStyle = '#fff'
      dollarCtx.font = 'bold 52px "JetBrains Mono", ui-monospace, monospace'
      dollarCtx.textAlign = 'center'
      dollarCtx.textBaseline = 'middle'
      dollarCtx.fillText('$', 32, 34)
    }
    const dollarTexture = new THREE.CanvasTexture(dollarCanvas)
    const sparkPositions = new Float32Array(SPARK_COUNT * 3).fill(-99)
    const sparkVelocities = new Float32Array(SPARK_COUNT * 3)
    const sparkLife = new Float32Array(SPARK_COUNT)
    const sparkGeometry = new THREE.BufferGeometry()
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))
    const sparks = new THREE.Points(
      sparkGeometry,
      new THREE.PointsMaterial({ color: green, map: dollarTexture, size: 16, sizeAttenuation: false, transparent: true, opacity: 0.9, depthTest: false }),
    )
    // Positions start at the origin, so the default bounding sphere would cull them.
    sparks.frustumCulled = false
    sparks.visible = !reduced
    root.add(sparks)
    let sparkCursor = 0
    const spawnSpark = (x: number, y: number) => {
      const k = sparkCursor++ % SPARK_COUNT
      sparkPositions.set([x + (Math.random() - 0.5) * 0.1, y, (Math.random() - 0.5) * 0.3], k * 3)
      sparkVelocities.set([(Math.random() - 0.5) * 0.15, 0.3 + Math.random() * 0.25, (Math.random() - 0.5) * 0.1], k * 3)
      sparkLife[k] = 1
    }

    const touched = new Float32Array(BIN_COUNT)

    let composer: EffectComposer | undefined
    if (finePointer) {
      composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.35, 0.25, 0.7))
      composer.addPass(new OutputPass())
    }
    const render = () => (composer ? composer.render() : renderer.render(scene, camera))

    // HTML labels pinned to scene points; text stays crisp and outside the bloom.
    const anchor = new THREE.Vector3()
    const pin = (label: HTMLElement, x: number, y: number) => {
      root.localToWorld(anchor.set(x, y, 0)).project(camera)
      const px = ((anchor.x + 1) / 2) * canvas.clientWidth
      const py = ((1 - anchor.y) / 2) * canvas.clientHeight
      label.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`
    }
    let labelledActive = CENTER_BIN
    let labelledPriceUsd = CENTER_PRICE_USD
    let labelledRangeCenter = CENTER_BIN
    let labelledRangeSliding = false
    const placeLabels = () => {
      // Hidden mid-slide: the bins easing out past the new edge would run under the labels.
      const rangeLabelOpacity = labelledRangeSliding ? '0' : '1'
      rangeLowLabel.style.opacity = rangeHighLabel.style.opacity = rangeLabelOpacity
      pin(rangeLowLabel, xOf(labelledRangeCenter - RANGE_HALF) - BIN_WIDTH / 2, 0)
      pin(rangeHighLabel, xOf(labelledRangeCenter + RANGE_HALF) + BIN_WIDTH / 2, 0)
      pin(priceLabel, xOf(labelledActive), bars[labelledActive].scale.y + 0.12)
      priceLabel.textContent = `SOL ${usd(labelledPriceUsd)}`
    }

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX / innerWidth - 0.5
      pointer.y = e.clientY / innerHeight - 0.5
    }
    if (finePointer && !reduced) addEventListener('pointermove', onPointerMove)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      renderer.setSize(w, h, false)
      composer?.setSize(w, h)
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
      render()
      placeLabels()
    }
    resize()
    addEventListener('resize', resize)

    // Reduced motion renders one frame, so it snaps to final values instead of easing.
    const ease = reduced ? 1 : 0.1
    let smoothedActive = CENTER_BIN
    let rangeTarget = CENTER_BIN
    let rangeCenter = CENTER_BIN
    let rangeMoves = 0
    let feesSol = 0
    let lastActive = -1
    let raf = 0
    const clock = new THREE.Clock()
    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime
      smoothedActive += (price(t) - smoothedActive) * 0.06
      const active = Math.round(smoothedActive)

      if (Math.abs(active - rangeTarget) > RANGE_HALF - RANGE_EDGE_BINS) {
        rangeTarget = active
        rangeMoves++
      }
      rangeCenter += (rangeTarget - rangeCenter) * (reduced ? 1 : 0.04)

      const crossed = active !== lastActive
      if (crossed && lastActive >= 0 && !reduced) {
        for (let k = 0; k < 3; k++) spawnSpark(xOf(active), bars[active].scale.y + 0.05)
        feesSol += FEE_SOL_PER_BIN_CROSS
      }
      if (crossed) touched[active] = 1

      let solUnits = 0
      for (let i = 0; i < BIN_COUNT; i++) {
        const inRange = Math.abs(i - rangeCenter) <= RANGE_HALF
        const h = inRange ? 0.2 + 1.35 * Math.exp(-(((i - rangeCenter) / 10) ** 2)) : 0.004
        const holdsSol = inRange && i > active
        const isActive = inRange && i === active
        const bar = bars[i]
        bar.scale.y += ((holdsSol || isActive ? h : h * 0.85) - bar.scale.y) * ease
        bar.material.color.lerp(isActive ? white : holdsSol ? cyan : inRange ? usdcGrey : outOfRange, reduced ? 1 : 0.12)
        touched[i] *= 0.985
        bar.material.emissive.copy(cyan).multiplyScalar(isActive ? 0.9 : touched[i] * 0.5)
        bar.visible = bar.scale.y > 0.02
        if (holdsSol) solUnits += h
        if (isActive) solUnits += h / 2
        const short = shorts[i]
        short.scale.y += ((holdsSol ? h * 0.8 : isActive ? h * 0.4 : 0.001) - short.scale.y) * ease
        short.visible = short.scale.y > 0.01
        edges[i].scale.y = bar.scale.y
        edges[i].visible = bar.visible
        edges[i].material.opacity = inRange ? (isActive ? 0.9 : holdsSol ? 0.35 : 0.12) : 0
      }

      if (!reduced) {
        for (let k = 0; k < SPARK_COUNT; k++) {
          if (sparkLife[k] <= 0) {
            sparkPositions[k * 3 + 1] = -99
            continue
          }
          sparkLife[k] -= dt * 0.6
          for (let a = 0; a < 3; a++) sparkPositions[k * 3 + a] += sparkVelocities[k * 3 + a] * dt
        }
        sparkGeometry.attributes.position.needsUpdate = true


        camera.position.set(cameraBase.x + pointer.x * 0.9, cameraBase.y - pointer.y * 0.5, cameraBase.z)
        camera.lookAt(lookAt)
        root.rotation.y = Math.sin(t * 0.15) * 0.1
      }

      const priceUsd = priceUsdAt(smoothedActive)
      if (crossed) {
        lastActive = active
        setReadout({
          priceUsd,
          rangeLowUsd: priceUsdAt(rangeTarget - RANGE_HALF),
          rangeHighUsd: priceUsdAt(rangeTarget + RANGE_HALF),
          solHeld: solUnits * SOL_PER_UNIT_HEIGHT,
          feesSol,
          rangeMoves,
        })
      }
      render()
      labelledActive = active
      labelledPriceUsd = priceUsd
      labelledRangeCenter = rangeCenter
      labelledRangeSliding = Math.abs(rangeTarget - rangeCenter) > 0.5
      placeLabels()
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onPointerMove)
      composer?.dispose()
      dollarTexture.dispose()
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
        aria-label="Animated Meteora DLMM liquidity bins. Bins above the floor hold SOL or USDC and re-centre when price nears the range edge. Purple bars below mirror the hedge short."
      />
      <div aria-hidden="true" className="pointer-events-none font-mono text-[11px] tabular-nums">
        <span ref={rangeLowRef} className="absolute left-0 top-0 -ml-2 whitespace-nowrap transition-opacity duration-300 text-text-muted [translate:-100%_-50%]">
          {usd(readout.rangeLowUsd)}
        </span>
        <span ref={rangeHighRef} className="absolute left-0 top-0 ml-2 whitespace-nowrap transition-opacity duration-300 text-text-muted [translate:0_-50%]">
          {usd(readout.rangeHighUsd)}
        </span>
        <span
          ref={priceRef}
          className="absolute left-0 top-0 hidden whitespace-nowrap rounded-md border border-white/10 bg-surface-800/80 px-1.5 py-0.5 text-text-primary [translate:-50%_-100%] sm:block"
        />
      </div>
      <div className="ml-auto mt-4 w-64 rounded-2xl border border-white/10 bg-surface-800/75 p-4 backdrop-blur lg:absolute lg:bottom-16 lg:right-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:mt-0">
        <p className="mb-2 font-mono text-xs text-text-muted">Illustrative position</p>
        <dl className="font-mono text-[13px] font-medium tabular-nums">
          <div className="flex justify-between py-1.5"><dt className="text-text-secondary">SOL price</dt><dd>{usd(readout.priceUsd)}</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-text-secondary">Range</dt><dd>{usd(readout.rangeLowUsd)} – {usd(readout.rangeHighUsd)}</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-[#22d3ee]">SOL held</dt><dd>{sol} SOL</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-[#a78bfa]">Perp short</dt><dd>−{sol} SOL</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt>Net exposure</dt><dd>≈ 0.0 SOL</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-[#4ade80]">Fees earned</dt><dd>+{readout.feesSol.toFixed(3)} SOL</dd></div>
          <div className="flex justify-between border-t border-white/10 py-1.5"><dt className="text-text-secondary">Range moves</dt><dd>{readout.rangeMoves}</dd></div>
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
