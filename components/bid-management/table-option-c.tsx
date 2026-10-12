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
    <span className="group/icon inline-flex">
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
          'pointer-events-none absolute -top-6 right-0 z-10 whitespace-nowrap rounded bg-ink px-1 py-0.5 text-[10px] font-medium text-surface transition-opacity group-focus-within/icon:opacity-100 group-hover/icon:opacity-100',
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
    <div className="relative flex items-center justify-end gap-1">
      <button
        type="button"
        className={cn(
          'whitespace-nowrap rounded px-1.5 py-1 text-[12px] text-brand transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand',
          engaged && 'bg-brand-tint',
        )}
      >
        Change bid
      </button>
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
            Bid Amount
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
          <th scope="col" className={cn(TH, 'w-[104px] px-1')}>
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
          <td className={cn(TD, 'text-brand')}>Bid</td>
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
        title: 'Option C — Default',
        description:
          'A "Change bid" text button and a trash icon (remove bid) sit at the end of every row, always visible. The trash stays muted so the table reads clean.',
        banner: {
          kind: 'pros',
          text: 'Actions are discoverable without hovering. The labeled Change bid button is unambiguous, and the small trash icon keeps Remove from dominating the row. Works on touch.',
        },
        children: (
          <TableOptionFrame>
            <IconActionsTable hovered={false} />
          </TableOptionFrame>
        ),
      }}
      right={{
        title: 'Option C — Row hovered / icon focused',
        description:
          'The row highlights, Change bid gets a blue wash, the trash turns red, and a tooltip names the remove action. Labels are also exposed as accessible names.',
        banner: {
          kind: 'cons',
          text: 'The trash is still icon-only, so CS must recognize it (the "Remove bid" label only appears on hover or focus). Adds a wider column to an already wide table.',
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
