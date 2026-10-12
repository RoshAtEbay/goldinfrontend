'use client'

import { cn } from '@/lib/utils'

type ToggleSwitchProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  labelledBy: string
  describedBy?: string
  disabled?: boolean
}

export function ToggleSwitch({
  checked,
  onCheckedChange,
  labelledBy,
  describedBy,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        checked ? 'bg-brand' : 'bg-switch-off',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0.5 left-0.5 size-4 rounded-full bg-surface shadow-sm transition-transform',
          checked && 'translate-x-4',
        )}
      />
    </button>
  )
}
