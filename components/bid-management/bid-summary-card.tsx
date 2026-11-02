import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { FactRow, PLAIN_DL } from './bidder-context'

/** The lot and its bid figures as one plain label/value list. */
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

      <dl className={`${PLAIN_DL} mt-3`}>
        <FactRow label="Current Max Bid">{formatUsd(maxBid)}</FactRow>
        <FactRow label="Current Price">{formatUsd(BID.currentPrice)}</FactRow>
        <FactRow label="Next Bid">{formatUsd(NEXT_BID)}</FactRow>
        <FactRow
          label="Bidding Power"
          tone={powerTooHigh ? 'text-error-ink' : undefined}
        >
          {formatUsd(BID.biddingPower)}
        </FactRow>
      </dl>
    </div>
  )
}
