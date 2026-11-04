'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AlertTriangle, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ToggleSwitch } from './toggle-switch'

export type Variant = 'current' | 'a' | 'b' | 'c'

const MANAGERS = ['Alex Rivera', 'Jordan Lee', 'Priya Shah', 'Sam Okafor']
const DEFAULT_ACTIVE_BID_TOTAL = 3000
const RESTRICT_DESCRIPTION = 'Blocks the user from placing any new bids'
const INITIAL_CREDIT = '5,000'

const usd = (value: number) => `$${value.toLocaleString('en-US')}`

function ToggleRow({
  label,
  checked,
  onCheckedChange,
  description,
  disabled,
  highlighted,
  rowRef,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  description?: string
  disabled?: boolean
  highlighted?: boolean
  rowRef?: React.Ref<HTMLDivElement>
}) {
  const labelId = useId()
  const descId = useId()

  return (
    <div
      ref={rowRef}
      className={cn(
        '-mx-2 rounded-md px-2 transition-shadow duration-300',
        highlighted && 'bg-brand-tint ring-2 ring-brand',
      )}
    >
      <div className="flex items-center justify-between py-2.5">
        <span
          id={labelId}
          className={cn('text-sm text-ink', disabled && 'text-faint')}
        >
          {label}
        </span>
        <ToggleSwitch
          checked={checked}
          onCheckedChange={onCheckedChange}
          labelledBy={labelId}
          describedBy={description ? descId : undefined}
          disabled={disabled}
        />
      </div>
      {description && (
        <p id={descId} className="-mt-1.5 pr-12 pb-2.5 text-xs leading-relaxed text-faint">
          {description}
        </p>
      )}
    </div>
  )
}

export function EditGeneralInfoCard({
  variant = 'current',
  initialCreditLimit = INITIAL_CREDIT,
  initialMode = 'adjust',
  activeBidTotal = DEFAULT_ACTIVE_BID_TOTAL,
}: {
  variant?: Variant
  initialCreditLimit?: string
  initialMode?: 'adjust' | 'block'
  activeBidTotal?: number
}) {
  const minCredit = activeBidTotal
  const hasActiveBids = minCredit > 0
  const creditId = useId()
  const creditHelpId = useId()
  const creditErrorId = useId()
  const managerId = useId()

  const [creditLimit, setCreditLimit] = useState(initialCreditLimit)
  const [manager, setManager] = useState('')
  const [verifiedTin, setVerifiedTin] = useState(true)
  const [reminderEmails, setReminderEmails] = useState(true)
  const [restrictBidding, setRestrictBidding] = useState(false)
  const [mode, setMode] = useState<'adjust' | 'block'>(initialMode)
  const [flashRestrict, setFlashRestrict] = useState(false)

  const restrictRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!flashRestrict) return
    const timeout = setTimeout(() => setFlashRestrict(false), 1800)
    return () => clearTimeout(timeout)
  }, [flashRestrict])

  const digits = creditLimit.replace(/[^0-9]/g, '')
  const creditValue = digits === '' ? null : Number(digits)
  const belowMinimum =
    hasActiveBids && creditValue !== null && creditValue < minCredit

  const isDirty =
    creditLimit !== INITIAL_CREDIT ||
    manager !== '' ||
    !verifiedTin ||
    !reminderEmails ||
    restrictBidding

  const hasBlockingError = variant === 'a' && belowMinimum
  const hasUnsavableLimit = variant === 'b' && belowMinimum && !restrictBidding
  const confirmDisabled =
    variant === 'current' || !isDirty || hasBlockingError || hasUnsavableLimit

  const showHelper = variant !== 'current' && hasActiveBids
  const showCallout = variant === 'b' && belowMinimum
  const showTabs = variant === 'c'
  const blockMode = variant === 'c' && mode === 'block'

  const restrictDescription =
    variant === 'a' || variant === 'b' ? RESTRICT_DESCRIPTION : undefined

  const scrollToRestrict = () => {
    restrictRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setFlashRestrict(true)
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink">
          Edit General Info
        </h3>
        <button
          type="button"
          aria-label="Close"
          className="-mr-1 rounded p-1 text-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      {showTabs && (
        <div
          role="tablist"
          aria-label="What do you want to do?"
          className="mt-4 flex gap-1 rounded-full bg-page p-1"
        >
          {(
            [
              ['adjust', 'Adjust credit limit'],
              ['block', 'Block bidding'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                'h-8 flex-1 rounded-full text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-brand',
                mode === id
                  ? 'bg-surface font-semibold text-ink shadow-sm'
                  : 'text-subtle hover:text-ink',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4">
        {!blockMode && (
        <div>
          <label
            htmlFor={creditId}
            className="mb-1 block text-[11px] text-faint"
          >
            Credit limit
          </label>
          <input
            id={creditId}
            type="text"
            inputMode="numeric"
            value={creditLimit}
            aria-invalid={hasBlockingError || undefined}
            aria-describedby={
              [showHelper && creditHelpId, hasBlockingError && creditErrorId]
                .filter(Boolean)
                .join(' ') || undefined
            }
            onChange={(event) => setCreditLimit(event.target.value)}
            className={cn(
              'h-9 w-full rounded border bg-surface px-2.5 text-sm text-ink outline-none focus:border-brand',
              hasBlockingError
                ? 'border-error-line focus:border-error-line'
                : 'border-field-line',
            )}
          />
          {showHelper && (
            <p
              id={creditHelpId}
              className="mt-1.5 text-xs leading-relaxed text-faint"
            >
              {`Minimum credit limit: ${usd(minCredit)}. This amount is required to cover bids already placed on the account.`}
            </p>
          )}
          {hasBlockingError && (
            <p
              id={creditErrorId}
              role="alert"
              className="mt-1.5 text-xs font-medium leading-relaxed text-error-ink"
            >
              {`Enter a credit limit of ${usd(minCredit)} or more.`}
            </p>
          )}
          {variant === 'b' && (
            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-200 ease-out',
                showCallout
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden" inert={!showCallout}>
                <div
                  role="status"
                  className="mt-3 flex gap-2.5 rounded-md border border-warn-line bg-warn-bg p-3 text-warn-ink"
                >
                  <AlertTriangle
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="text-[13px] leading-relaxed">
                    <p>
                      {creditValue !== null ? usd(creditValue) : '$0'} is below
                      the active bid total ({usd(minCredit)}), so it can&apos;t
                      be saved. Want to block all bidding instead?
                    </p>
                    <button
                      type="button"
                      onClick={scrollToRestrict}
                      className="mt-1 font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      Turn on Restrict Bidding
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {!blockMode && (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor={managerId} className="text-[11px] text-faint">
                Consignment Manager
              </label>
              <button
                type="button"
                onClick={() => setManager('')}
                className="text-[11px] text-faint hover:text-ink hover:underline"
              >
                Clear
              </button>
            </div>
            <div className="relative">
              <select
                id={managerId}
                value={manager}
                onChange={(event) => setManager(event.target.value)}
                className={cn(
                  'h-9 w-full appearance-none rounded border border-field-line bg-surface pr-9 pl-2.5 text-sm outline-none focus:border-brand',
                  manager === '' ? 'text-faint' : 'text-ink',
                )}
              >
                <option value="">Select manager...</option>
                {MANAGERS.map((name) => (
                  <option key={name} value={name} className="text-ink">
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-faint"
              />
            </div>
          </div>
        )}

        {blockMode ? (
          <RestrictPanel
            checked={restrictBidding}
            onCheckedChange={setRestrictBidding}
          />
        ) : (
          <div className="flex flex-col">
            <ToggleRow
              label="Verified TIN"
              checked={verifiedTin}
              onCheckedChange={setVerifiedTin}
            />
            <ToggleRow
              label="Send Payment Reminder Emails"
              checked={reminderEmails}
              onCheckedChange={setReminderEmails}
            />
            {variant !== 'c' && (
              <ToggleRow
                label="Restrict Bidding"
                checked={restrictBidding}
                onCheckedChange={setRestrictBidding}
                description={restrictDescription}
                highlighted={flashRestrict}
                rowRef={restrictRowRef}
              />
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          className="h-9 w-20 rounded border border-button-line bg-surface text-sm text-ink hover:bg-page focus-visible:outline-2 focus-visible:outline-brand"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={confirmDisabled}
          className={cn(
            'h-9 w-20 rounded text-sm text-surface',
            confirmDisabled
              ? 'cursor-not-allowed bg-disabled'
              : 'bg-brand hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
          )}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

function RestrictPanel({
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  const labelId = useId()
  const descId = useId()

  return (
    <div className="rounded-md border border-field-line bg-page p-4">
      <div className="flex items-center justify-between gap-4">
        <span id={labelId} className="text-[15px] font-semibold text-ink">
          Restrict Bidding
        </span>
        <ToggleSwitch
          checked={checked}
          onCheckedChange={onCheckedChange}
          labelledBy={labelId}
          describedBy={descId}
        />
      </div>
      <p id={descId} className="mt-2 text-[13px] leading-relaxed text-subtle">
        {RESTRICT_DESCRIPTION}. Existing bids stay as they are until the
        restriction is removed.
      </p>
    </div>
  )
}
