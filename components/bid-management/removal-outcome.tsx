'use client'

import { Fragment, useId, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  BID,
  CUSTOMER,
  LOT_LABEL,
  NEW_LEADING_BIDDER,
  formatUsd,
} from '@/lib/bids'
import { ContactChips } from './bidder-context'

export const MIN_BID_HELPER = `Minimum max bid: ${formatUsd(BID.minimumBid)}. This is the current price of ${LOT_LABEL} #${BID.lotNumber}.`

export const REMOVE_BID_COPY = `Remove ${CUSTOMER.name}'s most recent bid on ${LOT_LABEL} #${BID.lotNumber}. If it's the winning bid, the next highest bid will take its place.`

type Scenario = 'another' | 'none'

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'another', label: 'Another bidder' },
  { id: 'none', label: 'No other bidders' },
]

const OUTCOMES: Record<Scenario, { winner: string; bid: number | null }> = {
  another: { winner: NEW_LEADING_BIDDER.name, bid: NEW_LEADING_BIDDER.maxBid },
  none: { winner: 'None', bid: null },
}

export function useRemovalConfirm() {
  const [scenario, setScenario] = useState<Scenario>('another')
  const [understood, setUnderstood] = useState(false)
  return {
    scenario,
    setScenario,
    understood,
    setUnderstood,
    outcome: OUTCOMES[scenario],
  }
}

export type RemovalConfirm = ReturnType<typeof useRemovalConfirm>

export function OutcomeToggle({ confirm }: { confirm: RemovalConfirm }) {
  return (
    <div
      role="group"
      aria-label="Preview outcome"
      className="mb-3 flex items-center gap-2 text-[12px] text-faint"
    >
      <span>Preview outcome:</span>
      <div className="flex overflow-hidden rounded border border-field-line">
        {SCENARIOS.map((scenario) => {
          const selected = confirm.scenario === scenario.id
          return (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={selected}
              onClick={() => confirm.setScenario(scenario.id)}
              className={cn(
                'px-2.5 py-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand',
                selected
                  ? 'bg-ink font-medium text-surface'
                  : 'bg-surface text-subtle hover:bg-page',
              )}
            >
              {scenario.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function RemovalImpact({
  confirm,
  className,
}: {
  confirm: RemovalConfirm
  className?: string
}) {
  const { outcome } = confirm
  const groups = [
    {
      id: 'current',
      rows: [
        { label: 'Current winner', value: CUSTOMER.name, removed: true },
        {
          label: 'Current winning bid',
          value: formatUsd(BID.currentPrice),
          removed: true,
        },
      ],
      contactLabel: 'Current winner contact info',
      person: CUSTOMER,
    },
    {
      id: 'new',
      rows: [
        { label: 'New winner', value: outcome.winner, removed: false },
        {
          label: 'New winning bid',
          value: outcome.bid === null ? 'No bids' : formatUsd(outcome.bid),
          removed: false,
        },
      ],
      contactLabel: 'New winner contact info',
      person: outcome.bid === null ? null : NEW_LEADING_BIDDER,
    },
  ]

  return (
    <div className={className}>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
        {groups.map((group) => (
          <Fragment key={group.id}>
            {group.rows.map((row, index) => (
              <div
                key={row.label}
                className={cn(
                  group.id === 'new' &&
                    index === 0 &&
                    "relative before:absolute before:-top-1.5 before:left-0 before:h-px before:w-[calc(200%+1rem)] before:bg-line before:content-['']",
                )}
              >
                <dt className="text-[11px] text-faint">{row.label}</dt>
                <dd
                  className={cn(
                    'mt-0.5 text-[14px] font-semibold',
                    row.removed ? 'text-error-ink' : 'text-ink',
                  )}
                >
                  {row.value}
                </dd>
              </div>
            ))}
            {group.person && (
              <div className="col-span-2">
                <dt className="sr-only">{group.contactLabel}</dt>
                <dd>
                  <ContactChips person={group.person} compact />
                </dd>
              </div>
            )}
          </Fragment>
        ))}
      </dl>
    </div>
  )
}

export function RemovalImpactCard({
  confirm,
  className,
}: {
  confirm: ReturnType<typeof useRemovalConfirm>
  className?: string
}) {
  return (
    <div className={cn('rounded-md bg-context px-4 py-3', className)}>
      <p className="text-[14px] font-semibold text-ink">
        {LOT_LABEL} — Lot #{BID.lotNumber}
      </p>
      <RemovalImpact confirm={confirm} className="mt-3" />
    </div>
  )
}

export function RemovalWarning({
  lotLabel,
  className,
}: {
  lotLabel: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-md border border-danger-line bg-danger-bg p-4',
        className,
      )}
    >
      <TriangleAlert
        aria-hidden
        className="size-5 shrink-0 text-error-line"
      />
      <p className="text-[15px] font-semibold leading-snug text-error-ink">
        {`${CUSTOMER.name}'s most recent bid on ${lotLabel} will be permanently removed.`}
      </p>
    </div>
  )
}

export function AcknowledgeCheckbox({ confirm }: { confirm: RemovalConfirm }) {
  const id = useId()
  return (
    <div className="flex items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={confirm.understood}
        onChange={(event) => confirm.setUnderstood(event.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-error-line"
      />
      <label htmlFor={id} className="text-[13px] leading-snug text-ink">
  I understand this bid will be permanently removed, and this action cannot
  be undone.
      </label>
    </div>
  )
}
