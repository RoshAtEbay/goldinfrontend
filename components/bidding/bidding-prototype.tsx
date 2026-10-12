'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EditGeneralInfoCard, type Variant } from './edit-general-info-card'

const OPTIONS: { id: Variant; label: string }[] = [
  { id: 'current', label: 'Current' },
  { id: 'a', label: 'Option A' },
  { id: 'b', label: 'Option B' },
  { id: 'c', label: 'Option C' },
]

function Comparison({
  variant,
  defaultNote,
  errorNote,
  pros,
  cons,
  leftLabel = 'Default state',
  rightLabel = 'Too-low state',
  rightProps = { initialCreditLimit: '2,000' },
}: {
  variant: Variant
  defaultNote: React.ReactNode
  errorNote: React.ReactNode
  pros: string
  cons: string
  leftLabel?: string
  rightLabel?: string
  rightProps?: React.ComponentProps<typeof EditGeneralInfoCard>
}) {
  const noteClass = 'mb-3 text-[13px] leading-relaxed text-subtle'
  const sectionClass =
    'mx-auto w-full max-w-[520px] md:grid md:grid-rows-subgrid md:row-span-2'

  return (
    <div className="grid w-full max-w-[1080px] grid-cols-1 items-start gap-8 pt-10 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
      <section aria-label={leftLabel} className={sectionClass}>
        <p className={noteClass}>{defaultNote}</p>
        <EditGeneralInfoCard key={`${variant}-default`} variant={variant} />
      </section>
      <section aria-label={rightLabel} className={sectionClass}>
        <p className={noteClass}>{errorNote}</p>
        <EditGeneralInfoCard
          key={`${variant}-right`}
          variant={variant}
          {...rightProps}
        />
      </section>
      <div className="grid grid-cols-1 gap-8 md:col-span-2 md:mt-8 md:grid-cols-2 md:gap-12">
        <p className="mx-auto w-full max-w-[520px] text-[13px] leading-relaxed text-subtle">
          <span className="font-semibold text-ink">Pros:</span> {pros}
        </p>
        <p className="mx-auto w-full max-w-[520px] text-[13px] leading-relaxed text-subtle">
          <span className="font-semibold text-ink">Cons:</span> {cons}
        </p>
      </div>
    </div>
  )
}

export function BiddingPrototype() {
  const [variant, setVariant] = useState<Variant>('current')

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6 py-12">
      <div
        role="group"
        aria-label="Design option"
        className="fixed top-4 right-4 z-10 flex gap-1 rounded-full border border-line bg-surface p-1 shadow-sm"
      >
        {OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={variant === option.id}
            onClick={() => setVariant(option.id)}
            className={cn(
              'h-8 rounded-full px-3.5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-brand',
              variant === option.id
                ? 'bg-ink font-semibold text-surface'
                : 'text-subtle hover:text-ink',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {variant === 'a' ? (
        <Comparison
          variant="a"
          defaultNote={
            <>
              <span className="font-semibold text-ink">Default.</span> Below
              the Credit limit field, always show &ldquo;Minimum: $3,000 (active
              bids)&rdquo; in small gray helper text. Below the Restrict Bidding
              toggle, a one-liner: &ldquo;Blocks all new bids immediately,
              regardless of credit limit.&rdquo;
            </>
          }
          errorNote={
            <>
              <span className="font-semibold text-ink">On error</span> (value
              entered below minimum): field border turns red, inline message
              appears: &ldquo;Can&apos;t go below $3,000. To block bidding
              entirely, use Restrict Bidding below.&rdquo;
            </>
          }
          pros="Minimal change, low eng effort, easy to get approved."
          cons="Restrict Bidding is still buried at the bottom. CS reps who are in a hurry will still miss it. Doesn't solve the discoverability problem, just the information problem."
        />
      ) : variant === 'b' ? (
        <Comparison
          variant="b"
          defaultNote={
            <>
              <span className="font-semibold text-ink">
                Progressive disclosure with live validation.
              </span>{' '}
              The bet: CS reps make the wrong choice because they don&apos;t see
              the consequence until after they hit submit, so show it while they
              type. The Credit limit field shows the minimum as always-visible
              helper text, and Restrict Bidding gets a description: &ldquo;Blocks
              all new bids immediately, regardless of credit limit. Use this to
              stop a user from bidding right now.&rdquo;
            </>
          }
          errorNote={
            <>
              <span className="font-semibold text-ink">Too low.</span> As soon
              as the entered value drops below the minimum while typing, an amber
  callout slides in between Credit limit and Consignment Manager:
  &ldquo;$2,000 is below the active bid total ($3,000), so it
  can&apos;t be saved. Want to block all bidding instead?&rdquo; Confirm
  stays disabled until the value is $3,000 or more, or Restrict
  Bidding is turned on. The &ldquo;Turn on Restrict Bidding&rdquo;
  button scrolls to and highlights the toggle. Enter a valid value and the callout
              disappears.
            </>
          }
          pros="Catches the mistake before it happens. Actively routes CS reps to the right tool. Feels modern and intelligent."
          cons="More engineering complexity (live validation state). The callout appearing and disappearing while typing might feel jumpy. Needs careful copy to not feel like an error when it's just a guidance moment."
        />
      ) : variant === 'c' ? (
        <Comparison
          variant="c"
          leftLabel="Adjust credit limit state"
          rightLabel="Block bidding state"
          rightProps={{ initialMode: 'block' }}
          defaultNote={
            <>
              <span className="font-semibold text-ink">
                Adjust credit limit (default).
              </span>{' '}
              The bet: the root cause isn&apos;t missing information, it&apos;s
              that two different jobs are jammed into the same form, so separate
              them. Two pill options sit below the title. This tab holds only
              the account details: the Credit limit field with its minimum
              helper, Consignment Manager, and the Verified TIN and payment
              reminder toggles. Restrict Bidding does not appear here.
            </>
          }
          errorNote={
            <>
              <span className="font-semibold text-ink">Block bidding.</span>{' '}
              This tab holds only the Restrict Bidding toggle, front and center
              with a bold label and a description of what it does and what
              happens to existing bids. The credit limit and other fields do
              not appear here.
            </>
          }
          pros="Completely eliminates the confusion. CS reps pick their intent first. Hard to accidentally use the wrong tool."
          cons="Most structural change. Adds a step. Some CS reps may want to do both (reduce limit and restrict), and this makes that harder. Needs Adam's sign-off since it changes the modal architecture."
        />
      ) : (
        <div className="w-full max-w-[520px]">
          <EditGeneralInfoCard key={variant} variant={variant} />
        </div>
      )}
    </main>
  )
}
