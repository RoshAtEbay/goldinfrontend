import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { ContactRows, FactRow, PLAIN_DL } from './bidder-context'

function FactGroup({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div role="group" aria-label={label}>
      <p
        aria-hidden
        className="mb-2 border-b border-divider pb-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-faint"
      >
        {label}
      </p>
      <dl className={PLAIN_DL}>{children}</dl>
    </div>
  )
}

/** The lot, its bid figures and the bidder's details, grouped into two labelled sections. */
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

      <div className="mt-4 flex flex-col gap-5">
        <FactGroup label="Bid">
          <FactRow label="Status" tone="text-success">
            <span className="inline-flex items-center gap-1">
              Winning
              <Check aria-hidden className="size-3.5" strokeWidth={3} />
            </span>
          </FactRow>
          <FactRow label="Max Bid">{formatUsd(maxBid)}</FactRow>
          <FactRow label="Current Price">{formatUsd(BID.currentPrice)}</FactRow>
          <FactRow label="Next Bid">{formatUsd(NEXT_BID)}</FactRow>
        </FactGroup>

        <FactGroup label="Bidder">
          <FactRow
            label="Bidding Power"
            tone={powerTooHigh ? 'text-error-ink' : undefined}
          >
            {formatUsd(BID.biddingPower)}
          </FactRow>
          <ContactRows />
        </FactGroup>
      </div>
    </div>
  )
}
