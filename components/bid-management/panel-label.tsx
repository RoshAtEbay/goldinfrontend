export function PanelLabel({
  title,
  subtitle,
  whenToUse,
}: {
  title: string
  subtitle: string
  whenToUse: string
}) {
  return (
    <header className="mb-4">
      <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      <p className="mt-0.5 text-[13px] text-subtle">{subtitle}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-subtle">
        <span className="font-semibold text-ink">When to use:</span>{' '}
        {whenToUse}
      </p>
      <p className="mt-4 text-[13px] font-semibold text-ink">Current State</p>
      <hr className="mt-1.5 border-line" />
    </header>
  )
}
