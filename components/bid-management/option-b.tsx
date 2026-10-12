'use client'

import { Check, Trash2, TriangleAlert, X } from 'lucide-react'
import { BID, CUSTOMER, LOT_LABEL, NEXT_BID, formatUsd } from '@/lib/bids'
import { MaxBidInput, useMaxBidField } from './max-bid-field'
import { OptionPair } from './option-pair'

const CARD =
  'mx-auto w-full rounded-lg border border-line bg-surface p-6 shadow-sm'

function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className="-mr-1 -mt-1 flex size-7 shrink-0 items-center justify-center rounded text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
    >
      <X aria-hidden className="size-4" />
    </button>
  )
}

function BidFacts({ maxBid }: { maxBid: number }) {
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
    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="text-[11px] text-faint">{fact.label}</dt>
          <dd
            className={`mt-0.5 text-[14px] font-semibold ${fact.tone ?? 'text-ink'}`}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function OptionB() {
  const field = useMaxBidField()

  return (
    <OptionPair
      left={{
        title: 'Option B — Consolidated Change Bid Panel',
        description:
          "Purpose-built screen showing full bid context. Two clearly separated action zones. Adam's proposed approach.",
        banner: {
          kind: 'pros',
          text: 'Full context before acting. Two actions clearly separated. Shows winning status and next bid — the information CS needs to make the right call.',
        },
        children: (
          <section
            role="dialog"
            aria-label={`Change bid on behalf of ${CUSTOMER.name}`}
            className={`${CARD} max-w-[500px]`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[15px] font-semibold text-ink">
                Change bid on behalf of {CUSTOMER.name}
              </h3>
              <CloseButton onClick={field.reset} />
            </div>

            <div className="mb-5 mt-4 rounded-md bg-context px-4 py-3">
              <p className="flex items-baseline gap-2">
                <span className="text-[14px] font-semibold text-ink">
                  {LOT_LABEL}
                </span>
                <span className="text-[12px] text-faint">
                  Lot #{BID.lotNumber}
                </span>
              </p>
              <BidFacts maxBid={field.saved} />
            </div>

            <hr className="border-divider" />

            <div className="pt-4">
              <p className="mb-2 text-[13px] font-semibold text-ink">
                Adjust max bid
              </p>
              <MaxBidInput
                field={field}
                helper={`Cannot be lower than current price (${formatUsd(BID.currentPrice)})`}
                ariaLabel="New max bid"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  disabled={!field.canSave}
                  onClick={field.save}
                  className="h-[34px] w-[110px] rounded bg-brand text-[13px] font-medium text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:bg-disabled"
                >
                  Save changes
                </button>
              </div>
            </div>

            <hr className="my-4 border-divider" />

            <div className="pb-1">
              <p className="mb-1.5 text-[13px] font-semibold text-ink">
                Remove bid
              </p>
              <p className="mb-3 text-[13px] leading-relaxed text-subtle">
                Removes {CUSTOMER.name} from this lot entirely. The next highest
                bidder will take their place.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex h-[34px] w-[110px] items-center justify-center gap-1.5 rounded border border-field-line bg-surface text-[13px] font-medium text-error-line hover:bg-danger-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
                >
                  <Trash2 aria-hidden className="size-3.5" />
                  Remove bid
                </button>
              </div>
            </div>
          </section>
        ),
      }}
      right={{
        title: 'Option B — Removal Confirmation',
        description:
          'CS clicks Remove bid. Full-screen confirmation with all relevant context visible.',
        banner: {
          kind: 'cons',
          text: "More engineering work than Option A. Two-section layout needs careful hierarchy so Adjust and Remove don't get confused.",
        },
        children: (
          <section
            role="alertdialog"
            aria-labelledby="option-b-confirm-title"
            className={`${CARD} max-w-[460px]`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3
                id="option-b-confirm-title"
                className="text-[15px] font-semibold text-ink"
              >
                Confirm bid removal
              </h3>
              <CloseButton />
            </div>

            <div className="mb-5 mt-4 rounded-md bg-context px-4 py-3">
              <p className="text-[14px] font-semibold text-ink">
                {LOT_LABEL} — Lot #{BID.lotNumber}
              </p>
              <BidFacts maxBid={field.saved} />
            </div>

            <div className="mb-5 rounded-md border border-warn-edge bg-warn-bg p-3 text-[13px] leading-relaxed text-warn-ink">
              <TriangleAlert
                aria-hidden
                className="mr-1.5 inline size-4 -translate-y-px text-amber"
              />
              {CUSTOMER.name} will lose their winning position.{' '}
              {formatUsd(BID.currentPrice)} will no longer be the leading bid.
              This cannot be undone.
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="h-9 w-20 rounded border border-button-line bg-surface text-[13px] text-subtle hover:bg-page focus-visible:outline-2 focus-visible:outline-brand"
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-9 w-[130px] rounded bg-error-line text-[13px] font-medium text-white hover:bg-error-line/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
              >
                Confirm removal
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-faint">
              The next highest bidder will be notified automatically.
            </p>
          </section>
        ),
      }}
    />
  )
}
