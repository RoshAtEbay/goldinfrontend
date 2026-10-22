import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
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
    {
      label: 'Status',
      value: (
        <span className="inline-flex items-center gap-1">
          Winning
          <Check aria-hidden className="size-3.5" strokeWidth={3} />
        </span>
      ),
      tone: 'text-success',
    },
    { label: 'Next Bid', value: formatUsd(NEXT_BID) },
  ]

  return (
    <div className={cn('rounded-md bg-context px-4 py-3', className)}>
      <p className="flex items-baseline gap-2">
        <span className="text-[14px] font-semibold text-ink">{LOT_LABEL}</span>
        <span className="text-[12px] text-faint">Lot #{BID.lotNumber}</span>
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[11px] text-faint">{fact.label}</dt>
            <dd
              className={cn(
                'mt-0.5 text-[14px] font-semibold',
                fact.tone ?? 'text-ink',
              )}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
