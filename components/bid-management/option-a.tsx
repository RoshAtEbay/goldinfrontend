'use client'

import { Trash2, X } from 'lucide-react'
import { BID, CUSTOMER, LOT_LABEL } from '@/lib/bids'
import { BidSummaryCard } from './bid-summary-card'
import {
  MaxBidInput,
  SaveBidButton,
  useMaxBidField,
  type MaxBidField,
} from './max-bid-field'
import { OptionPair } from './option-pair'
import {
  AcknowledgeCheckbox,
  MIN_BID_HELPER,
  OutcomeToggle,
  REMOVE_BID_COPY,
  RemovalImpactCard,
  RemovalWarning,
  useRemovalConfirm,
} from './removal-outcome'

const CARD = 'mx-auto w-full rounded-lg border border-line bg-surface shadow-sm'

function EditBidDialog({ field }: { field: MaxBidField }) {
  return (
    <section
      role="dialog"
      aria-label={`Change bid on behalf of ${CUSTOMER.name}`}
      className={`${CARD} max-w-[500px] p-6`}
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

      <BidSummaryCard maxBid={field.saved} className="mb-5 mt-4" />

      <hr className="border-divider" />

      <div className="pt-4">
        <p className="mb-2 text-[13px] font-semibold text-ink">
          Adjust max bid
        </p>
        <MaxBidInput
          field={field}
          helper={MIN_BID_HELPER}
          ariaLabel="New max bid"
          action={<SaveBidButton field={field} />}
        />
      </div>

      <hr className="my-4 border-divider" />

      <div className="pb-1">
        <p className="mb-1.5 text-[13px] font-semibold text-ink">Remove bid</p>
        <p className="mb-3 text-[13px] leading-relaxed text-subtle">
          {REMOVE_BID_COPY}
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
  )
}

export function OptionA() {
  const field = useMaxBidField()
  const confirm = useRemovalConfirm()

  return (
    <div className="mx-auto flex w-full max-w-[1640px] flex-col gap-y-12">
      <OptionPair
        left={{
          title: 'Option A — Default',
          description:
            'CS clicks Change bid on a row. Full bid context at the top, then two separated action zones: Adjust max bid with a Save bid button beside the field, and a Remove bid section below that.',
          banner: {
            kind: 'pros',
            text: 'Lowest learning curve. Minimum change to existing patterns. Fast to build and approve.',
          },
          children: <EditBidDialog field={field} />,
        }}
        right={{
          title: 'Option A — Removal Confirmation',
          description:
            'CS clicks Remove bid. A separate "Confirm bid removal" modal shows who wins afterwards, with the new leading bidder\'s email and phone (copy buttons) so CS can contact them, and requires ticking a checkbox before the bid can be removed.',
          banner: {
            kind: 'cons',
            text: 'The Remove bid section at the bottom of the edit modal is quiet and may get missed under pressure. The required checkbox adds one more click to every removal.',
          },
          children: (
            <div className="mx-auto w-full max-w-[460px]">
              <OutcomeToggle confirm={confirm} />
              <section
                role="alertdialog"
                aria-labelledby="option-a-confirm-title"
                className={`${CARD} p-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3
                    id="option-a-confirm-title"
                    className="text-[15px] font-semibold text-ink"
                  >
                    Confirm bid removal
                  </h3>
                  <button
                    type="button"
                    aria-label="Close"
                    className="-mr-1 -mt-1 flex size-7 shrink-0 items-center justify-center rounded text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <X aria-hidden className="size-4" />
                  </button>
                </div>

                <RemovalWarning
                  lotLabel={`${LOT_LABEL} #${BID.lotNumber}`}
                  className="mt-4"
                />

                <RemovalImpactCard confirm={confirm} className="mb-5 mt-4" />

                <div className="mb-5">
                  <AcknowledgeCheckbox confirm={confirm} />
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
                    disabled={!confirm.understood}
                    className="h-9 w-[130px] rounded bg-error-line text-[13px] font-medium text-white hover:bg-error-line/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:bg-disabled"
                  >
                    Confirm removal
                  </button>
                </div>
              </section>
            </div>
          ),
        }}
      />
    </div>
  )
}
