'use client'

import type { ReactNode } from 'react'
import { Trash2, TriangleAlert } from 'lucide-react'
import { BID, CUSTOMER, LOT_LABEL, OTHER_BID, formatUsd } from '@/lib/bids'
import { MaxBidInput, useMaxBidField } from './max-bid-field'
import { OptionPair } from './option-pair'

const HEADERS = [
  'Date/Time',
  'Lot Number',
  'Title',
  'Max Bid',
  'Current Price',
  'Winner',
  '# Bids',
]

const CELL = 'px-3 py-3 align-middle'

function BidsTable({
  maxBid,
  expanded,
}: {
  maxBid: number
  expanded: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <table className="w-full border-collapse text-left text-[12px]">
        <thead>
          <tr className="border-b border-divider text-[11px] uppercase text-faint">
            {HEADERS.map((header) => (
              <th key={header} scope="col" className="px-3 py-2.5 font-medium">
                {header}
              </th>
            ))}
            <th scope="col" className="px-3 py-2.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-faint">
            <td className={CELL}>{OTHER_BID.placedAt}</td>
            <td className={CELL}>{OTHER_BID.lotNumber}</td>
            <td className={CELL}>{OTHER_BID.title}</td>
            <td className={CELL}>{formatUsd(OTHER_BID.maxBid)}</td>
            <td className={CELL}>{formatUsd(OTHER_BID.currentPrice)}</td>
            <td className={CELL}>No</td>
            <td className={CELL}>{OTHER_BID.bidCount}</td>
            <td className={CELL}>
              <button
                type="button"
                className="h-7 whitespace-nowrap rounded border border-line px-2 text-[11px] text-faint hover:bg-page"
              >
                Change bid
              </button>
            </td>
          </tr>
          <tr className="bg-surface text-ink">
            <td
              className={`${CELL} shadow-[inset_2px_0_0_0_var(--color-brand)]`}
            >
              {BID.placedAt}
            </td>
            <td className={CELL}>{BID.lotNumber}</td>
            <td className={`${CELL} text-brand`}>{LOT_LABEL}</td>
            <td className={CELL}>{formatUsd(maxBid)}</td>
            <td className={CELL}>{formatUsd(BID.currentPrice)}</td>
            <td className={CELL}>Yes</td>
            <td className={CELL}>{BID.bidCount}</td>
            <td className={CELL}>
              <button
                type="button"
                className="h-7 whitespace-nowrap rounded bg-brand px-2.5 text-[11px] font-medium text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Change bid
              </button>
            </td>
          </tr>
          {expanded}
        </tbody>
      </table>
    </div>
  )
}

export function OptionC() {
  const field = useMaxBidField()

  return (
    <OptionPair
      sideBySideFrom="xl"
      left={{
        title: 'Option C — Inline Adjustment',
        description:
          'CS clicks Change bid on a row. The row expands inline — no modal opens. Max bid editable directly in the table.',
        banner: {
          kind: 'pros',
          text: 'Most efficient for CS reps handling multiple bids. No modal context-switching. Scales to any number of bid rows.',
        },
        children: (
          <BidsTable
            maxBid={field.saved}
            expanded={
              <tr>
                <td
                  colSpan={8}
                  className="border-y border-expand-line bg-expand-bg px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-[60%]">
                      <MaxBidInput
                        compact
                        field={field}
                        label="New max bid:"
                        helper={`Min: ${formatUsd(BID.minimumBid)}`}
                      />
                    </div>
                    <div className="flex w-[40%] items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={!field.canSave}
                        onClick={field.save}
                        className="h-7 w-[60px] rounded bg-brand text-[12px] font-medium text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:bg-disabled"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="flex h-7 items-center gap-1 whitespace-nowrap rounded px-1.5 text-[12px] text-error-line hover:bg-danger-bg focus-visible:outline-2 focus-visible:outline-error-line"
                      >
                        <Trash2 aria-hidden className="size-3" />
                        Remove bid
                      </button>
                      <button
                        type="button"
                        onClick={field.reset}
                        className="h-7 rounded px-1.5 text-[12px] text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            }
          />
        ),
      }}
      right={{
        title: 'Option C — Inline Removal Confirmation',
        description:
          'CS clicks Remove on the expanded row. A confirmation strip expands below — still no modal.',
        banner: {
          kind: 'cons',
          text: 'Most complex to build. Inline confirmation patterns in tables are tricky to get right. Overkill for the common case of one bid per call.',
        },
        children: (
          <BidsTable
            maxBid={field.saved}
            expanded={
              <tr>
                <td
                  colSpan={8}
                  className="border-y border-danger-line bg-danger-bg px-4 py-3"
                  role="alert"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2 text-[13px] leading-snug text-error-ink">
                      <TriangleAlert
                        aria-hidden
                        className="mt-0.5 size-3.5 shrink-0 text-error-line"
                      />
                      <p>
                        Remove {CUSTOMER.name} from {LOT_LABEL} #{BID.lotNumber}
                        ?
                        <br />
                        They are the current winner. This cannot be undone.
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-[90px] rounded bg-error-line text-[12px] font-medium text-white hover:bg-error-line/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
                      >
                        Yes, remove
                      </button>
                      <button
                        type="button"
                        className="h-7 rounded px-1.5 text-[12px] text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            }
          />
        ),
      }}
    />
  )
}
