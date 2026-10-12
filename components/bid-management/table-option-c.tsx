import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BID, LOT_LABEL, formatUsd } from '@/lib/bids'
import { OptionPair } from './option-pair'
import {
  BidLinkHeader,
  DateTimeHeader,
  TD,
  TD_DATE,
  TH,
  TableOptionFrame,
} from './table-option-frame'

function IconAction({
  label,
  tone,
  engaged,
  children,
}: {
  label: string
  tone: 'brand' | 'danger'
  engaged: boolean
  children: React.ReactNode
}) {
  return (
    <span className="group/icon relative inline-flex">
      <button
        type="button"
        aria-label={label}
        className={cn(
          'flex size-6 items-center justify-center rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand',
          tone === 'brand'
            ? 'hover:bg-brand-tint hover:text-brand'
            : 'hover:bg-danger-bg hover:text-error-line',
          engaged
            ? tone === 'brand'
              ? 'bg-brand-tint text-brand'
              : 'bg-danger-bg text-error-line'
            : 'text-subtle',
        )}
      >
        {children}
      </button>
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute right-full top-1/2 z-10 mr-1 -translate-y-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 text-[10px] font-medium text-surface transition-opacity group-focus-within/icon:opacity-100 group-hover/icon:opacity-100',
          engaged ? 'opacity-100' : 'opacity-0',
        )}
      >
        {label}
      </span>
    </span>
  )
}

function RowActions({ engaged }: { engaged: boolean }) {
  return (
    <div className="relative flex items-center justify-end">
      <IconAction label="Remove bid" tone="danger" engaged={engaged}>
        <Trash2 aria-hidden className="size-3.5" />
      </IconAction>
    </div>
  )
}

function IconActionsTable({ hovered }: { hovered: boolean }) {
  return (
    <table className="w-full border-collapse text-left text-[12px]">
      <thead>
        <tr className="border-b border-divider">
          <DateTimeHeader />
          <th scope="col" className={TH}>
            Lot Number
          </th>
          <th scope="col" className={TH}>
            Title
          </th>
          <th scope="col" className={TH}>
            Max Bid
          </th>
          <BidLinkHeader />
          <th scope="col" className={TH}>
            Current Price
          </th>
          <th scope="col" className={TH}>
            Winner
          </th>
          <th scope="col" className={TH}>
            # Bids
          </th>
          <th scope="col" className={cn(TH, 'w-[104px] min-w-[104px] px-1')}>
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          data-hovered={hovered}
          className={cn(
            'group text-ink hover:bg-context',
            hovered ? 'bg-context' : 'bg-surface',
          )}
        >
          <td className={TD_DATE}>{BID.placedAt}</td>
          <td className={TD}>{BID.lotNumber}</td>
          <td className={cn(TD, 'text-brand')}>{LOT_LABEL}</td>
          <td className={TD}>{formatUsd(BID.initialMaxBid)}</td>
          <td className={TD}>
            <button
              type="button"
              className={cn(
                'whitespace-nowrap rounded px-1 py-0.5 text-[12px] text-brand transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                hovered && 'underline underline-offset-2',
              )}
            >
              Change bid
            </button>
          </td>
          <td className={TD}>{formatUsd(BID.currentPrice)}</td>
          <td className={TD}>{BID.winner ? 'Yes' : 'No'}</td>
          <td className={TD}>{BID.bidCount}</td>
          <td className={cn(TD, 'px-1')}>
            <RowActions engaged={hovered} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export function TableOptionC() {
  return (
    <OptionPair
      sideBySideFrom="xl"
      left={{
        title: 'Option B — Default',
        description:
          'A "Change bid" link sits right after the max bid value, and a small trash icon (remove bid) sits at the end of the row. Both are always visible, and the trash stays muted so the table reads clean.',
        banner: {
          kind: 'pros',
          text: 'Change bid lives next to the value it edits and is labeled, so it is unambiguous. The small trash icon keeps Remove from dominating the row. Both are discoverable without hovering and work on touch.',
        },
        children: (
          <TableOptionFrame>
            <IconActionsTable hovered={false} />
          </TableOptionFrame>
        ),
      }}
      right={{
        title: 'Option B — Row hovered / icon focused',
        description:
          'The row highlights, the Change bid link underlines, the trash turns red, and a tooltip names the remove action. Labels are also exposed as accessible names.',
        banner: {
          kind: 'cons',
          text: 'The trash is icon-only, so CS must recognize it (the "Remove bid" label only appears on hover or focus). Change bid and Remove sit at opposite ends of the row, so the two actions are not grouped.',
        },
        children: (
          <TableOptionFrame>
            <IconActionsTable hovered />
          </TableOptionFrame>
        ),
      }}
    />
  )
}
