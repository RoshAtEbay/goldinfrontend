import type { ReactNode } from 'react'
import {
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AUCTION_NAME, CUSTOMER, PROFILE_TABS } from '@/lib/bids'

export const TH =
  'px-2.5 py-2 align-bottom text-[10px] font-medium uppercase leading-tight text-faint'
export const TD = 'whitespace-nowrap px-2.5 py-2.5 align-middle'
export const TD_DATE = 'whitespace-nowrap px-2.5 py-2.5 align-middle'
export const ROW = 'border-b border-[#f0f0f0] last:border-b-0'

export function DateTimeHeader({ className }: { className?: string }) {
  return (
    <th scope="col" className={cn(TH, className)}>
      <span className="inline-flex items-center gap-1">
        Date/Time
        <ArrowDown aria-hidden className="size-2.5" />
      </span>
    </th>
  )
}

export function BidLinkHeader({ className }: { className?: string }) {
  return (
    <th scope="col" className={cn(TH, className)}>
      <span className="sr-only">Bid status</span>
    </th>
  )
}

export function ChangeBidButton({ active = false }: { active?: boolean }) {
  return (
    <button
      type="button"
      data-state={active ? 'active' : 'default'}
      className={cn(
        'h-6 whitespace-nowrap rounded border px-2 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        active
          ? 'border-brand bg-brand-tint text-brand'
          : 'border-field-line bg-surface text-btn-ink hover:bg-page',
      )}
    >
      Change bid
    </button>
  )
}

export function RemoveButton() {
  return (
    <button
      type="button"
      className="flex h-6 items-center gap-1 whitespace-nowrap rounded border border-danger-line bg-surface px-2 text-[10px] font-medium text-error-line hover:bg-danger-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
    >
      <Trash2 aria-hidden className="size-3" />
      Remove
    </button>
  )
}

function InfoBlock({
  label,
  lines,
}: {
  label: string
  lines: string[]
}) {
  return (
    <div className="min-w-0">
      <h4 className="text-[12px] font-semibold text-ink">{label}</h4>
      <div className="mt-1 text-[12px] leading-snug text-subtle">
        {lines.map((line) => (
          <p key={line} className="truncate">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function PageButton({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      disabled
      aria-label={label}
      className="flex size-6 items-center justify-center text-disabled"
    >
      {children}
    </button>
  )
}

export function TableOptionFrame({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="User profile, Bids tab"
      className="flex flex-col gap-3"
    >
      <div className="rounded-lg border border-line bg-surface px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-success px-1.5 py-0.5 text-[10px] font-medium leading-none text-success">
            {CUSTOMER.status}
          </span>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-[12px] font-medium leading-none text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Edit Profile
            <Pencil aria-hidden className="size-3" />
          </button>
        </div>

        <h3 className="mt-1 text-[22px] font-bold leading-tight text-ink">
          {CUSTOMER.name}
        </h3>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.05em] text-faint">
          Registered on: {CUSTOMER.registeredOn}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-x-4">
          <InfoBlock
            label="Contact Info"
            lines={[`Email: ${CUSTOMER.email}`, `Phone: ${CUSTOMER.phone}`]}
          />
          <InfoBlock label="Shipping Address" lines={CUSTOMER.shipping} />
          <InfoBlock label="Payout Address" lines={[CUSTOMER.payoutAddress]} />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <nav aria-label="Customer sections" className="border-b border-divider">
          <ul className="flex overflow-x-auto px-2.5 [scrollbar-width:none]">
            {PROFILE_TABS.map((tab) => {
              const active = tab === 'Bids'
              return (
                <li key={tab} className="shrink-0">
                  <span
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      '-mb-px block whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[11px]',
                      active
                        ? 'border-[#1e2a4a] font-semibold text-ink'
                        : 'border-transparent text-faint',
                    )}
                  >
                    {tab}
                  </span>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="px-5 py-4">
          <h4 className="text-[15px] font-semibold leading-tight text-ink">
            {AUCTION_NAME}
          </h4>

          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              className="flex h-7 items-center gap-1.5 rounded-md bg-[#1a1a1a] px-3 text-[12px] text-white hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <SlidersHorizontal aria-hidden className="size-3" />
              Select Auction
            </button>
            <label className="flex items-center gap-2 text-[12px] text-subtle">
              <input
                type="checkbox"
                className="size-3.5 rounded-sm border-field-line accent-ink"
              />
              Show All Lots
            </label>
          </div>

          <h5 className="mt-2.5 text-[12px] font-semibold text-ink">
            User Bids
          </h5>

          <div className="mt-2 flex h-8 items-center gap-2 rounded-md border border-line bg-surface px-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <Search aria-hidden className="size-3.5 shrink-0 text-faint" />
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search user bids"
              className="h-full w-full bg-transparent text-[12px] text-ink outline-none placeholder:text-faint"
            />
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-line">
            <div className="overflow-x-auto">{children}</div>

            <div className="flex items-center justify-between gap-3 border-t border-divider px-2.5 py-2 text-[11px] text-faint">
              <span>Page 1 of 1 (1 results)</span>
              <div className="flex items-center gap-0.5">
                <span className="mr-1 flex h-7 items-center gap-4 rounded-md border border-line px-2.5 text-ink">
                  Show 10
                  <ChevronDown aria-hidden className="size-3 text-faint" />
                </span>
                <PageButton label="First page">
                  <ChevronsLeft aria-hidden className="size-3.5" />
                </PageButton>
                <PageButton label="Previous page">
                  <ChevronLeft aria-hidden className="size-3.5" />
                </PageButton>
                <PageButton label="Next page">
                  <ChevronRight aria-hidden className="size-3.5" />
                </PageButton>
                <PageButton label="Last page">
                  <ChevronsRight aria-hidden className="size-3.5" />
                </PageButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
