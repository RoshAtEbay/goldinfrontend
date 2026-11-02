import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'

export function BidSummaryCard({
  maxBid,
  className,
}: {
  maxBid: number
  className?: string
}) {
  const facts = [
    { label: 'Max Bid', value: formatUsd(maxBid) },
    { label: 'Current Price', value: formatUsd(BID.currentPrice) },
    { label: 'Next Bid', value: formatUsd(NEXT_BID) },
  ]

  return (
    <div className={className}>
      <p className="flex items-baseline gap-2">
        <span className="text-[14px] font-semibold text-ink">{LOT_LABEL}</span>
        <span className="text-[12px] text-faint">Lot #{BID.lotNumber}</span>
      </p>
      <dl className="mt-3 grid grid-cols-3 gap-x-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[11px] text-faint">{fact.label}</dt>
            <dd className="mt-0.5 text-[14px] font-semibold text-ink">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
