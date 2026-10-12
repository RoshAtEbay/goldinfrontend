import type { ReactNode } from 'react'
import {
  ArrowDown,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AUCTION_NAME, CUSTOMER, PROFILE_TABS } from '@/lib/bids'

export const TH =
  'px-2 py-2.5 align-bottom text-[11px] font-medium uppercase leading-tight text-faint'
export const TD = 'whitespace-nowrap px-2 py-3 align-middle'
export const TD_DATE = 'w-[84px] min-w-[84px] px-2 py-3 align-middle'

export function DateTimeHeader() {
  return (
    <th scope="col" className={TH}>
      <span className="inline-flex items-center gap-1">
        Date/Time
        <ArrowDown aria-hidden className="size-3" />
      </span>
    </th>
  )
}

export function BidLinkHeader() {
  return (
    <th scope="col" className={TH}>
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
        'h-7 whitespace-nowrap rounded border px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
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
      className="flex h-7 items-center gap-1 whitespace-nowrap rounded border border-danger-line bg-surface px-2.5 text-[11px] font-medium text-error-line hover:bg-danger-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-line"
    >
      <Trash2 aria-hidden className="size-3" />
      Remove
    </button>
  )
}

export function TableOptionFrame({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="User profile, Bids tab"
      className="overflow-hidden rounded-lg border border-line bg-surface"
    >
      <div className="flex items-center justify-between gap-4 border-b border-divider px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <h3 className="truncate text-[18px] font-bold leading-tight text-ink">
            {CUSTOMER.name}
          </h3>
          <span className="rounded-full border border-success px-2 py-0.5 text-[11px] font-medium leading-none text-success">
            {CUSTOMER.status}
          </span>
        </div>
        <button
          type="button"
          className="flex h-8 shrink-0 items-center gap-2 rounded-md bg-brand px-3.5 text-[12px] font-medium text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Edit Profile
          <Pencil aria-hidden className="size-3" />
        </button>
      </div>

      <nav aria-label="Customer sections" className="border-b border-divider">
        <ul className="flex gap-x-5 overflow-x-auto px-5 [scrollbar-width:none]">
          {PROFILE_TABS.map((tab) => {
            const active = tab === 'Bids'
            return (
              <li key={tab} className="shrink-0">
                <span
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    '-mb-px block whitespace-nowrap border-b-2 py-3 text-[13px]',
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

      <div className="p-5">
        <h4 className="text-[16px] font-semibold text-ink">{AUCTION_NAME}</h4>

        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-[#1a1a1a] px-3 py-1.5 text-[13px] text-white hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <SlidersHorizontal aria-hidden className="size-3.5" />
            Select Auction
          </button>
          <label className="flex items-center gap-2 text-[13px] text-subtle">
            <input
              type="checkbox"
              className="size-4 rounded-sm border-field-line accent-ink"
            />
            Show All Lots
          </label>
        </div>

        <h5 className="mt-3 text-[13px] font-semibold text-ink">User Bids</h5>

        <div className="mt-2 flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
          <Search aria-hidden className="size-4 shrink-0 text-faint" />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search user bids"
            className="h-full w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-faint"
          />
        </div>

        <div className="mt-3 overflow-x-auto rounded-md border border-line">
          {children}
        </div>
      </div>
    </section>
  )
}
