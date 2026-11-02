'use client'

import { useState } from 'react'
import { Trash2, X } from 'lucide-react'
import { BID, CUSTOMER, LOT_LABEL } from '@/lib/bids'
import { BidSummaryCard } from './bid-summary-card'
import { BidderHeader, BidderSection, ContactChips } from './bidder-context'
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
import { Switcher } from './variant-switcher'

type DesignId = 'current' | 'a' | 'b' | 'c'

type Note = { kind: 'pros' | 'cons'; text: string }

type Design = {
  id: DesignId
  label: string
  edit: { description: string; banner: Note }
  confirm: { description: string; banner: Note }
}

const DESIGNS: Design[] = [
  {
    id: 'current',
    label: 'Current',
    edit: {
      description:
        "Today's layout. The bidder's name is only in the title, and the grey card shows lot facts with no name or contact details.",
      banner: {
        kind: 'cons',
        text: 'CS cannot see how to reach the bidder, and the two modals identify the bidder in different ways.',
      },
    },
    confirm: {
      description:
        "The name appears in the warning and in the before/after grid. There are no contact details, and the card doesn't match the edit modal.",
      banner: {
        kind: 'cons',
        text: 'Same bidder, shown differently from the edit modal, with no way to contact them.',
      },
    },
  },
  {
    id: 'a',
    label: 'Option A · Bidder header',
    edit: {
      description:
        'A bidder block sits directly under the title: avatar, name, status, then email and phone with copy buttons. The title becomes "Change bid" and the grey card holds only lot facts.',
      banner: {
        kind: 'pros',
        text: 'Who the bidder is and how to reach them are in one place, in the same position in both modals.',
      },
    },
    confirm: {
      description:
        'The same bidder block in the same position, followed by the warning and the before/after card.',
      banner: {
        kind: 'cons',
        text: 'The bidder block competes with the lot card for attention, and the name still appears again in the warning.',
      },
    },
  },
  {
    id: 'b',
    label: 'Option B · One merged card',
    edit: {
      description:
        'One grey card answers both questions: the bidder (name, status, email, phone) on top, the lot facts below. The title becomes "Change bid".',
      banner: {
        kind: 'pros',
        text: 'One card to scan, and the bidder is always tied to the bid they own.',
      },
    },
    confirm: {
      description:
        'The same card, with the before/after grid in place of the lot facts.',
      banner: {
        kind: 'cons',
        text: 'The card gets tall, and the before/after grid sits under a long contact block.',
      },
    },
  },
  {
    id: 'c',
    label: 'Option C · Contact chips',
    edit: {
      description:
        'The title keeps "on behalf of Adam Bales". Email and phone sit under it as two small chips with a copy button. Nothing else changes.',
      banner: {
        kind: 'pros',
        text: 'The smallest change to today\'s layout, and contact details are always one click from being copied.',
      },
    },
    confirm: {
      description:
        'The title stays "Confirm bid removal" with the same two chips under it. The warning names the bidder.',
      banner: {
        kind: 'cons',
        text: 'The chips have no name next to them, so the confirmation relies on the warning to say whose they are.',
      },
    },
  },
]

const CARD = 'mx-auto w-full rounded-lg border border-line bg-surface shadow-sm'
const PANEL_ID = 'layout-panel'

function EditBidDialog({
  field,
  design,
}: {
  field: MaxBidField
  design: DesignId
}) {
  const identityInTitle = design === 'current' || design === 'c'

  return (
    <section
      role="dialog"
      aria-label={`Change bid on behalf of ${CUSTOMER.name}`}
      className={`${CARD} max-w-[500px] p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[15px] font-semibold text-ink">
          {identityInTitle
            ? `Change bid on behalf of ${CUSTOMER.name}`
            : 'Change bid'}
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

      {design === 'a' && <BidderHeader className="mt-4" />}
      {design === 'c' && <ContactChips className="mt-3" />}

      <BidSummaryCard
        maxBid={field.saved}
        bidder={design === 'b' ? <BidderSection /> : undefined}
        className="mb-5 mt-4"
      />

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

function ConfirmRemovalDialog({
  confirm,
  design,
}: {
  confirm: RemovalConfirm
  design: DesignId
}) {
  return (
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

        {design === 'a' && <BidderHeader className="mt-4" />}
        {design === 'c' && <ContactChips className="mt-3" />}

        <RemovalWarning
          lotLabel={`${LOT_LABEL} #${BID.lotNumber}`}
          className="mt-4"
        />

        <RemovalImpactCard
          confirm={confirm}
          bidder={design === 'b' ? <BidderSection /> : undefined}
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
      </section>
    </div>
  )
}

export function OptionA() {
  const [designId, setDesignId] = useState<DesignId>('a')
  const field = useMaxBidField()
  const confirm = useRemovalConfirm()
  const design = DESIGNS.find((item) => item.id === designId) ?? DESIGNS[0]

  return (
    <div className="mx-auto flex w-full max-w-[1640px] flex-col gap-y-8">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <span className="text-[12px] text-faint">Bidder details layout</span>
        <Switcher
          label="Bidder details layout"
          prefix="layout"
          options={DESIGNS}
          value={designId}
          onChange={setDesignId}
          controls={PANEL_ID}
        />
      </div>

      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={`layout-tab-${designId}`}
      >
        <OptionPair
          left={{
            title: `Edit bid modal — ${design.label}`,
            description: design.edit.description,
            banner: design.edit.banner,
            children: <EditBidDialog field={field} design={designId} />,
          }}
          right={{
            title: `Removal confirmation — ${design.label}`,
            description: design.confirm.description,
            banner: design.confirm.banner,
            children: <ConfirmRemovalDialog confirm={confirm} design={designId} />,
          }}
        />
      </div>
    </div>
  )
}
