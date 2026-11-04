'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EditGeneralInfoCard, type Variant } from './edit-general-info-card'

const OPTIONS: { id: Variant; label: string }[] = [
  { id: 'current', label: 'Current' },
  { id: 'a', label: 'Option A' },
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
  extra,
}: {
  variant: Variant
  defaultNote: React.ReactNode
  errorNote: React.ReactNode
  pros: string
  cons: string
  leftLabel?: string
  rightLabel?: string
  rightProps?: React.ComponentProps<typeof EditGeneralInfoCard>
  extra?: {
    label: string
    note: React.ReactNode
    props: React.ComponentProps<typeof EditGeneralInfoCard>
  }
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
      {extra && (
        <section
          aria-label={extra.label}
          className="mx-auto w-full max-w-[520px] md:col-span-2 md:mt-10"
        >
          <p className={noteClass}>{extra.note}</p>
          <EditGeneralInfoCard
            key={`${variant}-extra`}
            variant={variant}
            {...extra.props}
          />
        </section>
      )}
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
  const [variant, setVariant] = useState<Variant>('a')

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
              the Credit limit field, show &ldquo;Minimum credit limit: $3,000.
              This amount is required to cover bids already placed on the
              account.&rdquo; in small gray helper text (hidden when the user
              has no active bids). Below the Restrict Bidding toggle, a
              one-liner: &ldquo;Blocks the user from placing any new bids.&rdquo;
            </>
          }
          errorNote={
            <>
              <span className="font-semibold text-ink">On error</span> (value
  entered below minimum): field border turns red and the helper text
  below it turns red. No extra message is added.
            </>
          }
          extra={{
            label: 'No active bids state',
            props: { activeBidTotal: 0 },
            note: (
              <>
                <span className="font-semibold text-ink">
                  No active bids.
                </span>{' '}
                The Credit limit field has no minimum, so the &ldquo;Minimum
                credit limit&rdquo; helper text is hidden. The Restrict
                Bidding one-liner still shows, and any value can be saved.
              </>
            ),
          }}
          pros="Minimal change, low eng effort, easy to get approved."
          cons="Restrict Bidding is still buried at the bottom. CS reps who are in a hurry will still miss it. Doesn't solve the discoverability problem, just the information problem."
        />
      ) : (
        <div className="w-full max-w-[520px]">
          <EditGeneralInfoCard key={variant} variant={variant} />
        </div>
      )}
    </main>
  )
}
