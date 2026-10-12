import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BID, CUSTOMER, PROFILE_TABS, formatUsd } from '@/lib/bids'

const COLUMNS = [
  'Date/Time',
  'Lot Number',
  'Title',
  'Max Bid',
  'Current Price',
  'Winner',
  '# Bids',
]

function InfoBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[11px] text-faint">{label}</p>
      <div className="mt-1 text-[13px] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  )
}

export function UserProfileBids({ maxBid }: { maxBid: number }) {
  return (
    <section
      aria-label="User profile, Bids tab"
      className="rounded-lg border border-line bg-surface p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[20px] font-semibold text-ink">
            {CUSTOMER.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-4 whitespace-nowrap">
            <InfoBlock label="Contact Info">
              <p>Email: {CUSTOMER.email}</p>
              <p>Phone: {CUSTOMER.phone}</p>
            </InfoBlock>
            <InfoBlock label="Shipping Address">
              {CUSTOMER.shipping.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </InfoBlock>
            <InfoBlock label="Payment Address">
              <p>{CUSTOMER.payoutAddress}</p>
            </InfoBlock>
          </div>
        </div>
        <button
          type="button"
          className="h-7 shrink-0 rounded border border-button-line bg-surface px-3 text-[11px] text-subtle hover:bg-[#fafafa] focus-visible:outline-2 focus-visible:outline-brand"
        >
          Edit Profile
        </button>
      </div>

      <nav
        aria-label="Customer sections"
        className="mt-5 -mx-5 overflow-x-auto border-b border-line px-5"
      >
        <ul className="flex min-w-max gap-5">
          {PROFILE_TABS.map((tab) => {
            const active = tab === 'Bids'
            return (
              <li key={tab}>
                <span
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    '-mb-px block whitespace-nowrap border-b-2 pb-2.5 text-[13px]',
                    active
                      ? 'border-ink font-semibold text-ink'
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

      <div className="mt-5">
        <h4 className="text-[14px] font-semibold text-ink">User Bids</h4>
        <label className="mt-2 flex w-fit items-center gap-2 text-[13px] text-faint">
          <input
            type="checkbox"
            className="size-3.5 rounded-sm border-field-line accent-ink"
          />
          Show All Lots
        </label>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-line">
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="h-10 whitespace-nowrap pr-2 text-[11px] font-medium uppercase text-faint"
                  >
                    {column}
                  </th>
                ))}
                <th scope="col" className="h-10">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-10 odd:bg-surface even:bg-[#fafafa]">
                <td className="whitespace-nowrap pr-2 text-ink">
                  {BID.placedAt}
                </td>
                <td className="pr-2 text-ink">{BID.lotNumber}</td>
                <td className="whitespace-nowrap pr-2 text-info-ink">
                  {BID.title}
                </td>
                <td className="pr-2 text-ink">{formatUsd(maxBid)}</td>
                <td className="pr-2 text-ink">{formatUsd(BID.currentPrice)}</td>
                <td className="pr-2 text-ink">{BID.winner ? 'Yes' : 'No'}</td>
                <td className="pr-2 text-ink">{BID.bidCount}</td>
                <td className="text-right">
                  <button
                    type="button"
                    className="h-7 rounded border border-button-line bg-surface px-3 text-[11px] text-subtle hover:bg-[#fafafa] focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-end gap-1 text-[12px] text-faint">
          <span>Page 1 of 1 · 1 results ·</span>
          <span className="flex items-center gap-0.5">
            Show 10
            <ChevronDown aria-hidden className="size-3" />
          </span>
        </div>
      </div>
    </section>
  )
}
