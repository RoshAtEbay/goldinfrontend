'use client'

import { TriangleAlert, X } from 'lucide-react'
import { BID, CUSTOMER, LOT_LABEL, formatUsd } from '@/lib/bids'
import { MaxBidInput, useMaxBidField } from './max-bid-field'
import { OptionPair } from './option-pair'

const CARD = 'mx-auto w-full rounded-lg border border-line bg-surface shadow-sm'

export function OptionA() {
  const field = useMaxBidField()

  return (
    <OptionPair
      left={{
        title: 'Option A — Default',
        description:
          'CS clicks Change bid on a row. Existing max bid adjustment UI with a removal danger zone added below.',
        banner: {
          kind: 'pros',
          text: 'Lowest learning curve. Minimum change to existing patterns. Fast to build and approve.',
        },
        children: (
          <section
            role="dialog"
            aria-label={`Change bid on behalf of ${CUSTOMER.name}`}
            className={`${CARD} max-w-[480px] p-6`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[15px] font-semibold text-ink">
                Change bid on behalf of {CUSTOMER.name}
              </h3>
              <button
                type="button"
                aria-label="Close"
                onClick={field.reset}
                className="-mr-1 -mt-1 flex size-7 shrink-0 items-center justify-center rounded text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            <div className="mb-4 mt-4 rounded-md bg-context p-2.5">
              <p className="text-[13px] font-semibold text-ink">
                {LOT_LABEL} — Lot #{BID.lotNumber}
              </p>
              <p className="mt-1 text-[12px] text-subtle">
                Max Bid: {formatUsd(field.saved)} · Current Price:{' '}
                {formatUsd(BID.currentPrice)} · Winner: Yes
              </p>
            </div>

            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-faint">
              Adjust max bid
            </p>
            <MaxBidInput
              field={field}
              helper={`Minimum: ${formatUsd(BID.minimumBid)} (current price)`}
            />
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                disabled={!field.canSave}
                onClick={field.save}
                className="h-[34px] w-[100px] rounded bg-brand text-[13px] font-medium text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:bg-disabled"
              >
                Save Changes
              </button>
            </div>

            <hr className="my-5 border-divider" />

            <p className="text-[12px] font-semibold uppercase tracking-wide text-error-line">
              Remove bid
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-subtle">
              Permanently removes {CUSTOMER.name} from {LOT_LABEL} #
              {BID.lotNumber}. The next highest bidder will take their place.
            </p>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                className="flex h-[34px] w-[100px] items-center justify-center gap-1.5 rounded border border-error-line bg-surface text-[13px] font-medium text-error-line hover:bg-danger-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
              >
                <TriangleAlert aria-hidden className="size-3.5" />
                Remove bid
              </button>
            </div>
          </section>
        ),
      }}
      right={{
        title: 'Option A — Removal Confirmation',
        description:
          'CS clicks Remove bid. A second confirmation modal appears before anything is deleted.',
        banner: {
          kind: 'cons',
          text: "One modal doing two different jobs. The danger zone at the bottom may get missed under pressure. Doesn't show full bid context before acting.",
        },
        children: (
          <section
            role="alertdialog"
            aria-labelledby="option-a-confirm-title"
            className={`${CARD} max-w-[400px]`}
          >
            <div className="border-b border-line px-5 py-4">
              <h3
                id="option-a-confirm-title"
                className="text-[16px] font-semibold text-ink"
              >
                Remove this bid?
              </h3>
            </div>
            <div className="p-5">
              <TriangleAlert
                aria-hidden
                className="mx-auto size-6 text-amber"
              />
              <div className="mt-3 text-center">
                <p className="mb-2 text-[14px] text-ink">
                  {CUSTOMER.name} will permanently lose their position on{' '}
                  {LOT_LABEL} #{BID.lotNumber}.
                </p>
                <p className="text-[13px] text-subtle">
                  The next highest bidder will become the new winner. This
                  cannot be undone.
                </p>
              </div>
              <div className="mt-4 rounded-md border border-danger-line bg-danger-bg p-3 text-[12px] leading-relaxed text-error-ink">
                <p>
                  Current winner: {CUSTOMER.name} — {formatUsd(BID.currentPrice)}
                </p>
                <p>Next bidder: [Unknown — engineer must verify]</p>
              </div>
              <div className="mt-5 flex justify-end gap-2">
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
                  Yes, remove bid
                </button>
              </div>
            </div>
          </section>
        ),
      }}
    />
  )
}
