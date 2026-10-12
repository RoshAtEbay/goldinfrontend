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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AUCTION_NAME,
  BID,
  CUSTOMER,
  MAX_BID_INPUT_ID,
  PROFILE_TABS,
  formatUsd,
} from '@/lib/bids'

const HEAD = 'h-10 pr-2 text-[12px] font-medium uppercase text-faint'

function InfoBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold text-ink">{label}</h4>
      <div className="mt-1 text-[12px] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  )
}

function PageButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      disabled
      aria-label={label}
      className="flex size-7 items-center justify-center text-disabled"
    >
      {children}
    </button>
  )
}

export function UserProfileBids({ maxBid }: { maxBid: number }) {
  return (
    <section
      aria-label="User profile, Bids tab"
      className="flex flex-col gap-4"
    >
      <div className="rounded-lg bg-surface p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-block rounded-full border border-[#16a34a] bg-surface px-2 py-0.5 text-[11px] font-medium leading-none text-[#16a34a]">
              {CUSTOMER.status}
            </span>
            <h3 className="mt-2 text-[28px] font-bold leading-tight text-ink">
              {CUSTOMER.name}
            </h3>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-faint">
              Registered on: {CUSTOMER.registeredOn}
            </p>
          </div>
          <button
            type="button"
            className="flex h-9 shrink-0 items-center gap-2 rounded-md bg-brand px-4 text-[13px] text-white hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Edit Profile
            <Pencil aria-hidden className="size-3.5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
          <InfoBlock label="Contact Info">
            <p>Email: {CUSTOMER.email}</p>
            <p>Phone: {CUSTOMER.phone}</p>
          </InfoBlock>
          <InfoBlock label="Shipping Address">
            {CUSTOMER.shipping.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </InfoBlock>
          <InfoBlock label="Payout Address">
            <p>{CUSTOMER.payoutAddress}</p>
          </InfoBlock>
        </div>
      </div>

      <div className="rounded-lg bg-surface shadow-sm">
        <nav
          aria-label="Customer sections"
          className="border-b border-line px-5"
        >
          <ul className="flex flex-wrap justify-center gap-x-6">
            {PROFILE_TABS.map((tab) => {
              const active = tab === 'Bids'
              return (
                <li key={tab}>
                  <span
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      '-mb-px block whitespace-nowrap border-b-2 py-3.5 text-[13px]',
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
          <h4 className="text-[18px] font-semibold text-ink">
            {AUCTION_NAME}
          </h4>

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

          <h5 className="mt-3 text-[13px] font-semibold text-ink">
            User Bids
          </h5>

          <div className="mt-2 flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <Search aria-hidden className="size-4 shrink-0 text-faint" />
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search user bids"
              className="h-full w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-faint"
            />
          </div>

          <div className="mt-3 rounded-md border border-line">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className={cn(HEAD, 'pl-3')}>
                    <span className="inline-flex items-center gap-1">
                      Date/Time
                      <ArrowDown aria-hidden className="size-3" />
                    </span>
                  </th>
                  <th scope="col" className={HEAD}>
                    Lot Number
                  </th>
                  <th scope="col" className={HEAD}>
                    Title
                  </th>
                  <th scope="col" className={HEAD}>
                    Bid Amount
                  </th>
                  <th scope="col" className="h-10 pr-2">
                    <span className="sr-only">Edit bid</span>
                  </th>
                  <th scope="col" className={HEAD}>
                    Current Price
                  </th>
                  <th scope="col" className={HEAD}>
                    Winner
                  </th>
                  <th scope="col" className={cn(HEAD, 'pr-2 text-right')}>
                    # Bids
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-10">
                  <td className="whitespace-nowrap py-2 pl-3 pr-2 text-ink">
                    {BID.placedAt}
                  </td>
                  <td className="pr-2 text-brand">{BID.lotNumber}</td>
                  <td className="whitespace-nowrap pr-2 text-brand">
                    {BID.title}
                  </td>
                  <td className="whitespace-nowrap pr-2 text-ink">
                    {formatUsd(maxBid)}
                  </td>
                  <td className="pr-2">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(MAX_BID_INPUT_ID)?.focus()
                      }
                      className="text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      Bid
                    </button>
                  </td>
                  <td className="whitespace-nowrap pr-2 text-ink">
                    {formatUsd(BID.currentPrice)}
                  </td>
                  <td className="pr-2 text-ink">
                    {BID.winner ? 'Yes' : 'No'}
                  </td>
                  <td className="pr-2 text-right text-brand">
                    {BID.bidCount}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2 text-[13px] text-subtle">
              <span>Page 1 of 1 (1 results)</span>
              <div className="flex items-center gap-1">
                <span className="mr-1 flex h-8 items-center gap-6 rounded-md border border-line px-3 text-ink">
                  Show 10
                  <ChevronDown aria-hidden className="size-3.5 text-faint" />
                </span>
                <PageButton label="First page">
                  <ChevronsLeft aria-hidden className="size-4" />
                </PageButton>
                <PageButton label="Previous page">
                  <ChevronLeft aria-hidden className="size-4" />
                </PageButton>
                <PageButton label="Next page">
                  <ChevronRight aria-hidden className="size-4" />
                </PageButton>
                <PageButton label="Last page">
                  <ChevronsRight aria-hidden className="size-4" />
                </PageButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
