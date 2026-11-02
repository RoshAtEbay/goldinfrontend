'use client'

import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { BID, formatUsd, parseUsd } from '@/lib/bids'

export function useMaxBidField(initial: number = BID.initialMaxBid) {
  const [saved, setSaved] = useState(initial)
  const [value, setValue] = useState(formatUsd(initial))

  const parsed = parseUsd(value)
  const tooLow = parsed !== null && parsed < BID.minimumBid
  const tooHigh = parsed !== null && parsed > BID.biddingPower
  const valid = parsed !== null && !tooLow && !tooHigh

  return {
    saved,
    value,
    setValue,
    parsed,
    tooLow,
    tooHigh,
    invalid: !valid,
    canSave: valid && parsed !== saved,
    format: () => {
      if (parsed !== null) setValue(formatUsd(parsed))
    },
    save: () => {
      if (!valid || parsed === null) return
      setSaved(parsed)
      setValue(formatUsd(parsed))
    },
    reset: () => setValue(formatUsd(saved)),
  }
}

export type MaxBidField = ReturnType<typeof useMaxBidField>

export function BiddingPower({ field }: { field: MaxBidField }) {
  return (
    <p
      className={cn(
        'whitespace-nowrap text-[13px] font-medium',
        field.tooHigh ? 'text-error-ink' : 'text-ink',
      )}
    >
      Bidding Power: {formatUsd(BID.biddingPower)}
    </p>
  )
}

export function SaveBidButton({ field }: { field: MaxBidField }) {
  return (
    <button
      type="button"
      disabled={!field.canSave}
      onClick={field.save}
      className="h-9 shrink-0 rounded bg-brand px-4 text-[13px] font-medium text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:bg-disabled"
    >
      Save bid
    </button>
  )
}

export function MaxBidInput({
  field,
  helper,
  label,
  compact = false,
  ariaLabel = 'Maximum bid',
  action,
}: {
  field: MaxBidField
  helper: string
  label?: string
  compact?: boolean
  ariaLabel?: string
  action?: ReactNode
}) {
  const inputId = useId()
  const helperId = useId()

  const message =
    field.parsed === null
      ? 'Enter a valid amount.'
      : field.tooHigh
        ? `Exceeds bidding power: ${formatUsd(BID.biddingPower)}`
        : helper

  return (
    <div>
      <div
        className={cn((label || action) && 'flex gap-2', label && 'items-center')}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="whitespace-nowrap text-[12px] text-subtle"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          aria-label={label ? undefined : ariaLabel}
          aria-invalid={field.invalid}
          aria-describedby={helperId}
          value={field.value}
          onChange={(event) => field.setValue(event.target.value)}
          onBlur={field.format}
          className={cn(
            'rounded border bg-surface px-3 text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand/20',
            compact
              ? 'h-7 w-[120px] text-[12px]'
              : 'h-9 min-w-0 flex-1 text-[13px]',
            field.invalid
              ? 'border-error-line'
              : 'border-field-line focus-visible:border-brand',
          )}
        />
        {action}
      </div>
      <p
        id={helperId}
        className={cn(
          'mt-1.5',
          compact ? 'text-[11px]' : 'text-[12px]',
          field.invalid ? 'text-error-ink' : 'text-faint',
        )}
      >
        {message}
      </p>
    </div>
  )
}
