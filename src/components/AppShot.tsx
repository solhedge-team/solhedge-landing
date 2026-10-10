type AppShotProps = {
  label: string
  url?: string
  src?: string
  className?: string
}

// Browser-framed app screenshot. Omit `src` to render a placeholder slot.
export function AppShot({ label, url = 'app.solhedge.xyz', src, className = '' }: AppShotProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-800 shadow-2xl shadow-black/60 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 truncate font-mono text-xs text-text-muted">{url}</span>
      </div>
      {src ? (
        <img src={src} alt={label} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
      ) : (
        <div
          role="img"
          aria-label={`${label} (screenshot coming soon)`}
          className="grid-pattern relative grid aspect-[16/10] place-items-center"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-purple/[0.06] via-transparent to-brand-cyan/[0.06]" />
          <div className="relative flex flex-col items-center gap-3 px-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-surface-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-text-muted" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="m3 16 5-5 4 4 3-3 6 6" />
                <circle cx="15.5" cy="8.5" r="1.5" />
              </svg>
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">Screenshot</p>
            <p className="font-body text-sm text-text-secondary">{label}</p>
          </div>
        </div>
      )}
    </div>
  )
}
