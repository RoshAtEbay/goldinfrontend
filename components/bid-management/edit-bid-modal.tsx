'use client'

import { useId, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BID, formatUsd, parseUsd } from '@/lib/bids'

export function EditBidModal({
  maxBid,
  onConfirm,
}: {
  maxBid: number
  onConfirm: (amount: number) => void
}) {
  const titleId = useId()
  const inputId = useId()
  const helperId = useId()
  const [value, setValue] = useState(formatUsd(maxBid))

  const parsed = parseUsd(value)
  const belowCurrent = parsed !== null && parsed < BID.currentPrice
  const invalid = parsed === null || belowCurrent

  const reset = () => setValue(formatUsd(maxBid))

  return (
    <section
      role="dialog"
      aria-labelledby={titleId}
      className="rounded-lg border border-line bg-surface p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 id={titleId} className="text-[15px] font-semibold text-ink">
          Edit Bid
        </h3>
        <button
          type="button"
          aria-label="Close"
          onClick={reset}
          className="-mr-1 flex size-7 items-center justify-center rounded text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>

      <div className="mt-3 rounded bg-[#f9f9f9] p-2.5">
        <p className="text-[13px] font-semibold text-ink">
          {BID.title} — Lot #{BID.lotNumber}
        </p>
        <p className="mt-0.5 text-[12px] text-[#666]">
          Current bid: {formatUsd(BID.currentPrice)}
        </p>
      </div>

      <div className="mt-4">
        <label htmlFor={inputId} className="block text-[11px] text-faint">
          Max bid
        </label>
        <input
          id={inputId}
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
            'mt-1 h-9 w-full rounded border bg-surface px-3 text-[13px] text-ink outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20',
            invalid ? 'border-error-line' : 'border-field-line',
          )}
        />
        <p
          id={helperId}
          className={cn(
            'mt-1.5 text-[12px]',
            invalid ? 'text-error-ink' : 'text-faint',
          )}
        >
          Max bid cannot be set lower than the current bid (
          {formatUsd(BID.currentPrice)})
        </p>
      </div>

      {/* Intentionally empty: there is no Remove action today. */}
      <div className="h-12" aria-hidden />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={reset}
          className="h-8 rounded border border-button-line bg-surface px-4 text-[13px] text-subtle hover:bg-[#fafafa] focus-visible:outline-2 focus-visible:outline-brand"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={invalid}
          onClick={() => {
            if (parsed !== null) onConfirm(parsed)
          }}
          className="h-8 rounded bg-brand px-4 text-[13px] font-semibold text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-disabled disabled:text-white"
        >
          Confirm
        </button>
      </div>
    </section>
  )
}
