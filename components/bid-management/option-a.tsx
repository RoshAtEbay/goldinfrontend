'use client'

import { Trash2, X } from 'lucide-react'
import { BID, CUSTOMER, LOT_LABEL } from '@/lib/bids'
import { PlainFacts } from './bid-summary-card'
import { ContactChips } from './bidder-context'
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
  type RemovalConfirm,
} from './removal-outcome'

const EDIT_COPY = {
  title: 'Edit bid modal',
  description:
    'The lot title leads, then four plain rows: current max bid, current price, next bid and bidding power. Contact details are not repeated here. No boxes.',
  banner: {
    kind: 'pros' as const,
    text: 'Only the figures CS needs to set a new max bid are on screen, and contact details stay in the removal confirmation.',
  },
}

const CONFIRM_COPY = {
  title: 'Removal confirmation',
  description:
    'Adam Bales\'s email and phone chips sit under the title. Jordan Reyes\'s chips appear in the before/after card under "New winner", labelled "New winner contact info".',
  banner: {
    kind: 'cons' as const,
    text: 'Contact details live in two places, the title area and the card, so CS has to look in both to find the person they need.',
  },
}

const CARD = 'mx-auto w-full rounded-lg border border-line bg-surface shadow-sm'

function ModalHeader({
  title,
  titleId,
  onClose,
}: {
  title: string
  titleId?: string
  onClose?: () => void
}) {
  return (
    <header className="relative flex min-h-14 items-center justify-center border-b border-divider px-14 py-3">
      <h3
        id={titleId}
        className="text-balance text-center text-[16px] font-bold leading-snug text-ink"
      >
        {title}
      </h3>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-faint hover:bg-page hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
      >
        <X aria-hidden className="size-5" strokeWidth={1.5} />
      </button>
    </header>
  )
}

function EditBidDialog({ field }: { field: MaxBidField }) {
  return (
    <section
      role="dialog"
      aria-label={`Edit maximum bid on behalf of ${CUSTOMER.name}`}
      className={`${CARD} max-w-[500px]`}
    >
      <ModalHeader
        title={`Edit maximum bid on behalf of ${CUSTOMER.name}`}
        onClose={field.reset}
      />

      <div className="px-6 pb-6 pt-5">
        <PlainFacts
          maxBid={field.saved}
          powerTooHigh={field.tooHigh}
          className="mb-5"
        />

        <hr className="border-divider" />

        <div className="pt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">
            Maximum Bid
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
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-ink">Remove bid</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-subtle">
                {REMOVE_BID_COPY}
              </p>
            </div>
            <button
              type="button"
              className="flex h-9 w-[110px] shrink-0 items-center justify-center gap-1.5 rounded border border-field-line bg-surface text-[13px] font-medium text-error-line transition-colors hover:border-error-line hover:bg-error-line hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
            >
              <Trash2 aria-hidden className="size-3.5" />
              Remove bid
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConfirmRemovalDialog({ confirm }: { confirm: RemovalConfirm }) {
  return (
    <div className="mx-auto w-full max-w-[460px]">
      <OutcomeToggle confirm={confirm} />
      <section
        role="alertdialog"
        aria-labelledby="option-a-confirm-title"
        className={CARD}
      >
        <ModalHeader title="Confirm bid removal" titleId="option-a-confirm-title" />

        <div className="px-6 pb-6 pt-5">
          <ContactChips person={CUSTOMER} />

          <RemovalWarning
            lotLabel={`${LOT_LABEL} #${BID.lotNumber}`}
            className="mt-4"
          />

          <RemovalImpactCard
            confirm={confirm}
            className="mb-5 mt-4"
          />

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
        </div>
      </section>
    </div>
  )
}

export function OptionA() {
  const field = useMaxBidField()
  const confirm = useRemovalConfirm()

  return (
    <div className="mx-auto w-full max-w-[1640px]">
      <OptionPair
        left={{
          title: EDIT_COPY.title,
          description: EDIT_COPY.description,
          banner: EDIT_COPY.banner,
          children: <EditBidDialog field={field} />,
        }}
        right={{
          title: CONFIRM_COPY.title,
          description: CONFIRM_COPY.description,
          banner: CONFIRM_COPY.banner,
          children: <ConfirmRemovalDialog confirm={confirm} />,
        }}
      />
    </div>
  )
}
