import { cn } from '@/lib/utils'
import { BID, LOT_LABEL, formatUsd } from '@/lib/bids'
import { OptionPair } from './option-pair'
import {
  BidLinkHeader,
  ChangeBidButton,
  DateTimeHeader,
  TD,
  TD_DATE,
  TH,
  TableOptionFrame,
} from './table-option-frame'

function InlineActionTable({ active }: { active: boolean }) {
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
          <th scope="col" className={cn(TH, 'w-[170px]')}>
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
        </tr>
      </thead>
      <tbody>
        <tr className={cn('text-ink', active && 'bg-row-tint')}>
          <td className={TD_DATE}>{BID.placedAt}</td>
          <td className={TD}>{BID.lotNumber}</td>
          <td className={cn(TD, 'text-brand')}>{LOT_LABEL}</td>
          <td className={TD}>
            <div className="flex items-center gap-1">
              <span className="text-[14px]">{formatUsd(BID.initialMaxBid)}</span>
              <button
                type="button"
                data-state={active ? 'active' : 'default'}
                className={cn(
                  'h-[26px] whitespace-nowrap rounded border px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                  active
                    ? 'border-brand bg-brand-tint text-brand'
                    : 'border-field-line bg-surface text-btn-ink hover:bg-page',
                )}
              >
                Change bid
              </button>
            </div>
          </td>
          <td className={cn(TD, 'text-brand')}>Bid</td>
          <td className={TD}>{formatUsd(BID.currentPrice)}</td>
          <td className={TD}>{BID.winner ? 'Yes' : 'No'}</td>
          <td className={TD}>{BID.bidCount}</td>
        </tr>
      </tbody>
    </table>
  )
}

export function TableOptionB() {
  return (
    <OptionPair
      sideBySideFrom="xl"
      left={{
        title: 'Option B — Default',
        description:
          "Change bid button lives inside the Bid Amount cell, next to the dollar value. Column renamed to Max Bid. Adam's proposed approach.",
        banner: {
          kind: 'pros',
          text: "Action lives next to the data it affects. Logical connection between the value and the edit. Adam's proposed design — easy to get approved.",
        },
        children: (
          <TableOptionFrame>
            <InlineActionTable active={false} />
          </TableOptionFrame>
        ),
      }}
      right={{
        title: 'Option B — Active',
        description:
          'CS clicks Change bid. Button state changes. Row highlighted before modal opens.',
        banner: {
          kind: 'cons',
          text: 'One column doing two jobs — data and action. MAX BID cell becomes noticeably wider. Remove action has no obvious home on the row.',
        },
        children: (
          <TableOptionFrame>
            <InlineActionTable active />
          </TableOptionFrame>
        ),
      }}
    />
  )
}
