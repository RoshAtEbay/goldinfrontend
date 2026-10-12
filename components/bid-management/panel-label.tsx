export function PanelLabel({
  title,
  subtitle,
  whenToUse,
  stateLabel = 'Current State',
}: {
  title: string
  subtitle: string
  whenToUse?: string
  stateLabel?: string
}) {
  return (
    <header className="mb-4">
      <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      <p className="mt-0.5 text-[13px] leading-relaxed text-subtle">
        {subtitle}
      </p>
      {whenToUse && (
        <p className="mt-2 text-[13px] leading-relaxed text-subtle">
          <span className="font-semibold text-ink">When to use:</span>{' '}
          {whenToUse}
        </p>
      )}
      <p className="mt-4 text-[13px] font-semibold text-ink">{stateLabel}</p>
      <hr className="mt-1.5 border-line" />
    </header>
  )
}
