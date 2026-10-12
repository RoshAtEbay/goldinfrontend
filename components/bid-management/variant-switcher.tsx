'use client'

import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type SwitcherOption<T extends string> = {
  id: T
  label: string
}

export function Switcher<T extends string>({
  label,
  prefix,
  options,
  value,
  onChange,
  controls,
}: {
  label: string
  prefix: string
  options: readonly SwitcherOption<T>[]
  value: T
  onChange: (id: T) => void
  controls: string
}) {
  const tabId = (id: T) => `${prefix}-tab-${id}`

  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step =
      event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (step === 0) return
    event.preventDefault()
    const next = options[(index + step + options.length) % options.length]
    onChange(next.id)
    document.getElementById(tabId(next.id))?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm"
    >
      {options.map((option, index) => {
        const selected = option.id === value
        return (
          <button
            key={option.id}
            id={tabId(option.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={controls}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => move(event, index)}
            className={cn(
              'h-8 whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              selected
                ? 'bg-ink text-white'
                : 'text-subtle hover:bg-page hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
