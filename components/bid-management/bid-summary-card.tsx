import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { cn } from '@/lib/utils'

function Stat({
  label,
  tone,
  children,
}: {
  label: string
  tone?: string
  children: string
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-medium text-ink">{label}</dt>
      <dd className={cn('mt-1 text-[14px] text-subtle', tone)}>{children}</dd>
    </div>
  )
}

/** The lot, then its four bid figures as stacked label-over-value blocks. */
export function PlainFacts({
  maxBid,
  powerTooHigh,
  className,
}: {
  maxBid: number
  powerTooHigh: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-[15px] font-semibold text-ink">
        {LOT_LABEL}{' '}
        <span className="text-[13px] font-normal text-faint">
          Lot #{BID.lotNumber}
        </span>
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 min-[460px]:grid-cols-4 min-[460px]:gap-x-3">
        <Stat label="Current Max Bid">{formatUsd(maxBid)}</Stat>
        <Stat label="Current Price">{formatUsd(BID.currentPrice)}</Stat>
        <Stat label="Next Bid">{formatUsd(NEXT_BID)}</Stat>
        <Stat
          label="Bidding Power"
          tone={powerTooHigh ? 'text-error-ink' : undefined}
        >
          {formatUsd(BID.biddingPower)}
        </Stat>
      </dl>
    </div>
  )
}
