import { BID, LOT_LABEL, formatUsd } from '@/lib/bids'
import { cn } from '@/lib/utils'

type Fact = { label: string; value: string; tone?: string }

function Stat({ label, value, tone }: Fact) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-medium text-ink">{label}</dt>
      <dd className={cn('mt-1 text-[14px] text-subtle', tone)}>{value}</dd>
    </div>
  )
}

/** The lot, then its three bid figures as label-over-value blocks side by side. */
export function BidFacts({
  maxBid,
  powerTooHigh,
  className,
}: {
  maxBid: number
  powerTooHigh: boolean
  className?: string
}) {
  const facts: Fact[] = [
    { label: 'Current Max Bid', value: formatUsd(maxBid) },
    { label: 'Current Price', value: formatUsd(BID.currentPrice) },
    {
      label: 'Bidding Power',
      value: formatUsd(BID.biddingPower),
      tone: powerTooHigh ? 'text-error-ink' : undefined,
    },
  ]

  return (
    <div className={className}>
      <p className="text-[15px] font-semibold text-ink">
        {LOT_LABEL}{' '}
        <span className="text-[13px] font-normal text-faint">
          Lot #{BID.lotNumber}
        </span>
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 min-[460px]:grid-cols-3 min-[460px]:gap-x-3">
        {facts.map((fact) => (
          <Stat key={fact.label} {...fact} />
        ))}
      </dl>
    </div>
  )
}
