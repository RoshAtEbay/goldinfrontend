import { cn } from '@/lib/utils'
import { BID, LOT_LABEL, formatUsd } from '@/lib/bids'
import { OptionPair } from './option-pair'
import {
  DateTimeHeader,
  ROW,
  TD,
  TD_DATE,
  TH,
  TableOptionFrame,
} from './table-option-frame'

function ChangeBidLink({ active }: { active: boolean }) {
  return (
    <button
      type="button"
      data-state={active ? 'active' : 'default'}
      className={cn(
        'whitespace-nowrap rounded-sm px-1 py-0.5 text-[12px] text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        active ? 'font-medium underline underline-offset-2' : 'hover:underline',
      )}
    >
      Change bid
    </button>
  )
}

function OriginalTable({ active }: { active: boolean }) {
  return (
    <table className="w-full min-w-[620px] border-collapse text-left text-[12px]">
      <thead>
        <tr className="border-b border-divider">
          <DateTimeHeader />
          <th scope="col" className={cn(TH, 'text-center')}>
            Lot Number
          </th>
          <th scope="col" className={TH}>
            Title
          </th>
          <th scope="col" className={TH}>
            Max Bid
          </th>
          <th scope="col" className={cn(TH, 'text-center')}>
            Current Price
          </th>
          <th scope="col" className={cn(TH, 'text-center')}>
            Winner
          </th>
          <th scope="col" className={cn(TH, 'text-right')}>
            # Bids
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={cn(ROW, 'text-ink', active && 'bg-row-tint')}>
          <td className={TD_DATE}>{BID.placedAt}</td>
          <td className={cn(TD, 'text-center text-brand')}>{BID.lotNumber}</td>
          <td className={cn(TD, 'text-brand')}>{LOT_LABEL}</td>
          <td className={TD}>
            <div className="flex items-center gap-1">
              <span>{formatUsd(BID.initialMaxBid)}</span>
              <ChangeBidLink active={active} />
            </div>
          </td>
          <td className={cn(TD, 'text-center')}>{formatUsd(BID.currentPrice)}</td>
          <td className={cn(TD, 'text-center')}>{BID.winner ? 'Yes' : 'No'}</td>
          <td className={cn(TD, 'text-right text-brand')}>{BID.bidCount}</td>
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
        description:
          "Adam's original: a plain Change bid link sits right beside the Max Bid value. No new column.",
        banner: {
          kind: 'pros',
          text: "Matches Adam's mock exactly. No new column, and the edit sits next to the value it changes. Lowest build effort.",
        },
        children: (
          <TableOptionFrame>
            <OriginalTable active={false} />
          </TableOptionFrame>
        ),
      }}
      right={{
        title: 'Option A — Active',
        description:
          'CS clicks Change bid. The link underlines and the row is highlighted before the modal opens.',
        banner: {
          kind: 'cons',
          text: 'A text link is easy to miss in a dense table, and there is no obvious home on the row for a Remove action.',
        },
        children: (
          <TableOptionFrame>
            <OriginalTable active />
          </TableOptionFrame>
        ),
      }}
    />
  )
}
