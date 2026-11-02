import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { ContactRows, FactRow, PLAIN_DL } from './bidder-context'

/** Option C: every lot, bid and contact fact as one plain label/value list. */
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
