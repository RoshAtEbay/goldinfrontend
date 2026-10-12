import { cn } from '@/lib/utils'
import { BID, LOT_LABEL, formatUsd } from '@/lib/bids'
import { OptionPair } from './option-pair'
import {
  BidLinkHeader,
  ChangeBidButton,
  DateTimeHeader,
  ROW,
  TD,
  TD_DATE,
  TH,
  TableOptionFrame,
} from './table-option-frame'

function ActionsColumnTable({ active }: { active: boolean }) {
  return (
    <table className="w-full min-w-[640px] border-collapse text-left text-[12px]">
      <thead>
        <tr className="border-b border-divider">
          <DateTimeHeader className="w-[140px]" />
          <th scope="col" className={cn(TH, 'w-[60px]')}>
            Lot Number
          </th>
          <th scope="col" className={cn(TH, 'w-[90px]')}>
            Title
          </th>
          <th scope="col" className={cn(TH, 'w-[70px]')}>
            Bid Amount
          </th>
          <BidLinkHeader className="w-[40px]" />
          <th scope="col" className={cn(TH, 'w-[80px]')}>
            Current Price
          </th>
          <th scope="col" className={cn(TH, 'w-[55px]')}>
            Winner
          </th>
          <th scope="col" className={cn(TH, 'w-[50px]')}>
            # Bids
          </th>
          <th scope="col" className={cn(TH, 'w-[80px]')}>
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={cn(ROW, 'text-ink', active && 'bg-row-tint')}>
          <td className={TD_DATE}>{BID.placedAt}</td>
          <td className={TD}>{BID.lotNumber}</td>
          <td className={cn(TD, 'text-brand')}>{LOT_LABEL}</td>
          <td className={TD}>{formatUsd(BID.initialMaxBid)}</td>
          <td className={cn(TD, 'text-brand')}>Bid</td>
          <td className={TD}>{formatUsd(BID.currentPrice)}</td>
          <td className={TD}>{BID.winner ? 'Yes' : 'No'}</td>
          <td className={TD}>{BID.bidCount}</td>
          <td className={cn(TD, 'text-right')}>
            <ChangeBidButton active={active} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export function TableOptionA() {
  return (
    <OptionPair
      sideBySideFrom="xl"
      left={{
        title: 'Option A — Default',
        description: 'Actions column always visible at the far right of every bid row.',
        banner: {
          kind: 'pros',
          text: 'Always visible. No hunting. Standard admin table pattern CS reps already know.',
        },
        children: (
          <TableOptionFrame>
            <ActionsColumnTable active={false} />
          </TableOptionFrame>
        ),
      }}
      right={{
        title: 'Option A — Active',
        description:
          'CS clicks Change bid. Button gets a pressed/active state before the modal opens.',
        banner: {
          kind: 'cons',
          text: "Adds a column to an already wide table. The column has no header, so nothing tells CS what actions are available until they see the button.",
        },
        children: (
          <TableOptionFrame>
            <ActionsColumnTable active />
          </TableOptionFrame>
        ),
      }}
    />
  )
}
