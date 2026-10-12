import type { ReactNode } from 'react'

type AppShotProps = {
  url?: string
  className?: string
} & ({ src: string; label: string } | { children: ReactNode })

// Browser-framed app screenshot. Pass `children` to render custom frame content.
export function AppShot({ url = 'app.solhedge.xyz', className = '', ...body }: AppShotProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-800 shadow-2xl shadow-black/60 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 truncate font-mono text-xs text-text-muted">{url}</span>
      </div>
      {'children' in body ? body.children : <img src={body.src} alt={body.label} loading="lazy" className="block h-auto w-full" />}
    </div>
  )
}
