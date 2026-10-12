import { Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BID, LOT_LABEL, OTHER_BID, formatUsd } from '@/lib/bids'
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
  disabled,
  children,
}: {
  label: string
  tone: 'brand' | 'danger'
  engaged: boolean
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <span className="group/icon relative inline-flex">
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        className={cn(
          'flex size-6 items-center justify-center rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-35',
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
      {!disabled && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 text-[10px] font-medium text-surface transition-opacity group-focus-within/icon:opacity-100 group-hover/icon:opacity-100',
            engaged ? 'opacity-100' : 'opacity-0',
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
}

function RowIcons({
  engaged,
  disabled,
  tooltipOn,
}: {
  engaged: boolean
  disabled?: boolean
  tooltipOn?: 'change' | 'remove'
}) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <IconAction
        label="Change bid"
        tone="brand"
        engaged={engaged && tooltipOn === 'change'}
        disabled={disabled}
      >
        <Pencil aria-hidden className="size-3.5" />
      </IconAction>
      <IconAction
        label="Remove bid"
        tone="danger"
        engaged={engaged && tooltipOn === 'remove'}
        disabled={disabled}
      >
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
          <th scope="col" className={cn(TH, 'w-[64px]')}>
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="group bg-surface text-faint">
          <td className={TD_DATE}>{OTHER_BID.placedAt}</td>
          <td className={TD}>{OTHER_BID.lotNumber}</td>
          <td className={TD}>{OTHER_BID.title}</td>
          <td className={TD}>{formatUsd(OTHER_BID.maxBid)}</td>
          <td className={TD}>Bid</td>
          <td className={TD}>{formatUsd(OTHER_BID.currentPrice)}</td>
          <td className={TD}>{OTHER_BID.winner ? 'Yes' : 'No'}</td>
          <td className={TD}>{OTHER_BID.bidCount}</td>
          <td className={cn(TD, 'pl-0')}>
            <RowIcons engaged={false} disabled />
          </td>
        </tr>
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
          <td className={cn(TD, 'pl-0')}>
            <RowIcons engaged={hovered} tooltipOn="change" />
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
          'A pencil (change bid) and a trash can (remove bid) sit at the end of every row, always visible. They stay muted so the table reads clean. On a non-winning bid both are disabled.',
        banner: {
          kind: 'pros',
          text: 'Actions are discoverable without hovering, and the small icons keep the table quiet. Both actions are one click away and more icons can be added later. Works on touch.',
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
          'The row highlights, the icons take on color (blue pencil, red trash), and a tooltip names the action. Labels are also exposed as accessible names.',
        banner: {
          kind: 'cons',
          text: 'Icon-only buttons rely on CS recognizing the pencil and trash icons, and the text label only appears on hover or focus. Adds a narrow column to an already wide table.',
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
