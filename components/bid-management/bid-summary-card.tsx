import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { ContactRows, FactRow, PLAIN_DL } from './bidder-context'

/** Every lot, bid and contact fact as one plain label/value list. */
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
      <p className="text-[14px] text-ink">
        {LOT_LABEL} <span className="text-faint">Lot #{BID.lotNumber}</span>
      </p>
      <dl className={`${PLAIN_DL} mt-2`}>
        <FactRow label="Max Bid">{formatUsd(maxBid)}</FactRow>
        <FactRow label="Current Price">{formatUsd(BID.currentPrice)}</FactRow>
        <FactRow label="Next Bid">{formatUsd(NEXT_BID)}</FactRow>
        <FactRow
          label="Bidding Power"
          tone={powerTooHigh ? 'text-error-ink' : undefined}
        >
          {formatUsd(BID.biddingPower)}
        </FactRow>
        <ContactRows />
      </dl>
    </div>
  )
}

