'use client'

import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export const VARIANTS = [
  { id: 'current', label: 'Current' },
  { id: 'a', label: 'Option A' },
  { id: 'b', label: 'Option B' },
  { id: 'c', label: 'Option C' },
] as const

export type VariantId = (typeof VARIANTS)[number]['id']

export const tabId = (id: VariantId) => `variant-tab-${id}`
export const panelId = (id: VariantId) => `variant-panel-${id}`

export function VariantSwitcher({
  value,
  onChange,
}: {
  value: VariantId
  onChange: (id: VariantId) => void
}) {
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step =
      event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (step === 0) return
    event.preventDefault()
    const next = VARIANTS[(index + step + VARIANTS.length) % VARIANTS.length]
    onChange(next.id)
    document.getElementById(tabId(next.id))?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Design option"
      className="flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm"
    >
      {VARIANTS.map((variant, index) => {
        const selected = variant.id === value
        return (
          <button
            key={variant.id}
            id={tabId(variant.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(variant.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(variant.id)}
            onKeyDown={(event) => move(event, index)}
            className={cn(
              'h-8 rounded-full px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              selected
                ? 'bg-ink text-white'
                : 'text-subtle hover:bg-page hover:text-ink',
            )}
          >
            {variant.label}
          </button>
        )
      })}
    </div>
  )
}
