'use client'

import { useId, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BID, CUSTOMER, MAX_BID_INPUT_ID, formatUsd, parseUsd } from '@/lib/bids'

export function EditBidModal({
  onConfirm,
}: {
  onConfirm: (amount: number) => void
}) {
  const titleId = useId()
  const helperId = useId()
  const [value, setValue] = useState('')

  const parsed = parseUsd(value)
  const touched = value.trim() !== ''
  const tooLow = parsed !== null && parsed < BID.minimumBid
  const tooHigh = parsed !== null && parsed > BID.biddingPower
  const invalid = touched && (parsed === null || tooLow || tooHigh)
  const canPlace = parsed !== null && !tooLow && !tooHigh

  const reset = () => setValue('')

  const helper = tooHigh
    ? `Exceeds bidding power: ${formatUsd(BID.biddingPower)}`
    : `Minimum Bid: ${formatUsd(BID.minimumBid)}`

  return (
    <section
      role="dialog"
      aria-labelledby={titleId}
      className="rounded-lg border border-line bg-surface shadow-sm"
    >
      <div className="relative flex items-center justify-center border-b border-line px-5 py-3.5">
        <h3 id={titleId} className="text-[14px] font-semibold text-ink">
          Edit maximum bid on behalf of {CUSTOMER.name}
        </h3>
        <button
          type="button"
          aria-label="Close"
          onClick={reset}
          className="absolute right-3 flex size-7 items-center justify-center rounded text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>

      <div className="px-5 pb-8 pt-6">
        <div className="flex flex-col gap-2 text-[13px] text-ink">
          <p>Title: {BID.title}</p>
          <div className="flex flex-col gap-1">
            <p>Current Price: {formatUsd(BID.currentPrice)}</p>
            <p>Bidding Power: {formatUsd(BID.biddingPower)}</p>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor={MAX_BID_INPUT_ID}
            className="block text-[12px] font-medium text-ink"
          >
            Maximum Bid
          </label>
          <input
            id={MAX_BID_INPUT_ID}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            aria-invalid={invalid}
            aria-describedby={helperId}
            onChange={(event) => setValue(event.target.value)}
            onBlur={() => {
              if (parsed !== null) setValue(formatUsd(parsed))
            }}
            className={cn(
              'mt-1.5 h-9 w-36 rounded border bg-surface px-3 text-[13px] text-ink outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20',
              invalid ? 'border-error-line' : 'border-field-line',
            )}
          />
          <p
            id={helperId}
            className={cn(
              'mt-1.5 text-[12px] italic',
              invalid ? 'text-error-ink' : 'text-faint',
            )}
          >
            {helper}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <button
          type="button"
          disabled={!canPlace}
          onClick={() => {
            if (parsed === null) return
            onConfirm(parsed)
            reset()
          }}
          className="h-8 w-20 rounded-full bg-brand text-[12px] text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:bg-disabled"
        >
          Place Bid
        </button>
        <button
          type="button"
          onClick={reset}
          className="h-8 w-[60px] rounded-full border border-line bg-surface text-[12px] text-subtle hover:bg-page focus-visible:outline-2 focus-visible:outline-brand"
        >
          Cancel
        </button>
      </div>
    </section>
  )
}
