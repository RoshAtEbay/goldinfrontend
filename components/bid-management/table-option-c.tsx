import { cn } from '@/lib/utils'
import { BID, LOT_LABEL, OTHER_BID, formatUsd } from '@/lib/bids'
import { OptionPair } from './option-pair'
import {
  BidLinkHeader,
  ChangeBidButton,
  DateTimeHeader,
  RemoveButton,
  TD,
  TD_DATE,
  TH,
  TableOptionFrame,
} from './table-option-frame'

function HoverRevealTable({ hovered }: { hovered: boolean }) {
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
          <th scope="col" className={cn(TH, 'w-[190px] min-w-[190px]')}>
            # Bids
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="group bg-surface text-faint hover:bg-context">
          <td className={TD_DATE}>{OTHER_BID.placedAt}</td>
          <td className={TD}>{OTHER_BID.lotNumber}</td>
          <td className={TD}>{OTHER_BID.title}</td>
          <td className={TD}>{formatUsd(OTHER_BID.maxBid)}</td>
          <td className={TD}>Bid</td>
          <td className={TD}>{formatUsd(OTHER_BID.currentPrice)}</td>
          <td className={TD}>{OTHER_BID.winner ? 'Yes' : 'No'}</td>
          <td className={cn(TD, 'relative')}>{OTHER_BID.bidCount}</td>
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
          <td className={cn(TD, 'relative')}>
            {BID.bidCount}
            <div
              className={cn(
                'absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100',
                hovered ? 'opacity-100' : 'opacity-0',
              )}
            >
              <ChangeBidButton />
              <RemoveButton />
            </div>
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
        title: 'Option C — Default (no hover)',
        description:
          'Table is clean. No action buttons visible. Rows show data only.',
        banner: {
          kind: 'pros',
          text: 'Cleanest table by default. Both actions (Change bid + Remove) visible simultaneously on hover. Scales well as more actions are added.',
        },
        children: (
          <TableOptionFrame>
            <HoverRevealTable hovered={false} />
          </TableOptionFrame>
        ),
      }}
      right={{
        title: 'Option C — Hovered',
        description:
          'CS hovers over a row. Two action buttons appear at the right: Change bid and Remove. Both actions visible simultaneously.',
        banner: {
          kind: 'cons',
          text: "Actions are hidden until hover — CS reps may not discover them. Doesn't work well on touch devices. Hover states are harder to show in design reviews.",
        },
        children: (
          <TableOptionFrame>
            <HoverRevealTable hovered />
          </TableOptionFrame>
        ),
      }}
    />
  )
}
