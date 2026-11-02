import { BID, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { cn } from '@/lib/utils'

type FactsProps = {
  maxBid: number
  powerTooHigh: boolean
  className?: string
}

type Fact = { label: string; value: string; tone?: string }

function factsFor({ maxBid, powerTooHigh }: FactsProps): Fact[] {
  return [
    { label: 'Current Max Bid', value: formatUsd(maxBid) },
    { label: 'Current Price', value: formatUsd(BID.currentPrice) },
    { label: 'Next Bid', value: formatUsd(NEXT_BID) },
    {
      label: 'Bidding Power',
      value: formatUsd(BID.biddingPower),
      tone: powerTooHigh ? 'text-error-ink' : undefined,
    },
  ]
}

function LotTitle() {
  return (
    <p className="text-[15px] font-semibold text-ink">
      {LOT_LABEL}{' '}
      <span className="text-[13px] font-normal text-faint">
        Lot #{BID.lotNumber}
      </span>
    </p>
  )
}

/** Option A: the lot, then four label-left / value-right rows. */
export function PlainFacts(props: FactsProps) {
  return (
    <div className={props.className}>
      <LotTitle />
      <dl className="mt-3 grid grid-cols-[8.5rem_1fr] items-center gap-x-4 gap-y-1 text-[13px]">
        {factsFor(props).map(({ label, value, tone }) => (
          <div key={label} className="contents">
            <dt className="text-faint">{label}</dt>
            <dd className={cn('min-w-0 font-medium', tone ?? 'text-ink')}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Option B: the lot, then four label-over-value blocks side by side. */
export function StackedFacts(props: FactsProps) {
  return (
    <div className={props.className}>
      <LotTitle />
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 min-[460px]:grid-cols-4 min-[460px]:gap-x-3">
        {factsFor(props).map(({ label, value, tone }) => (
          <div key={label} className="min-w-0">
            <dt className="text-[12px] font-medium text-ink">{label}</dt>
            <dd className={cn('mt-1 text-[14px] text-subtle', tone)}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
