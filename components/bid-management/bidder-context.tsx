'use client'

import { useState } from 'react'
import { Check, Copy, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CUSTOMER } from '@/lib/bids'

function formatPhone(raw: string) {
  const match = raw.match(/^\+1(\d{3})(\d{3})(\d{4})$/)
  return match ? `+1 (${match[1]}) ${match[2]}-${match[3]}` : raw
}

const CONTACTS = [
  {
    key: 'email',
    label: 'Email',
    copyValue: CUSTOMER.email,
    display: CUSTOMER.email,
    href: `mailto:${CUSTOMER.email}`,
    Icon: Mail,
  },
  {
    key: 'phone',
    label: 'Phone',
    copyValue: CUSTOMER.phone,
    display: formatPhone(CUSTOMER.phone),
    href: `tel:${CUSTOMER.phone}`,
    Icon: Phone,
  },
]

const INITIALS = CUSTOMER.name
  .split(' ')
  .map((part) => part[0])
  .join('')

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="flex size-7 shrink-0 items-center justify-center rounded text-faint hover:bg-page hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
    >
      {copied ? (
        <Check aria-hidden className="size-3.5 text-success" />
      ) : (
        <Copy aria-hidden className="size-3.5" />
      )}
    </button>
  )
}

function Avatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-context font-semibold text-ink',
        className,
      )}
    >
      {INITIALS}
    </span>
  )
}

function StatusText() {
  return (
    <span className="text-[12px] font-semibold capitalize text-success">
      {CUSTOMER.status.toLowerCase()}
    </span>
  )
}

/** Option A: identity block that sits directly under the modal title. */
export function BidderHeader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Avatar className="size-10 text-[14px]" />
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-ink">
            {CUSTOMER.name}
          </span>
          <StatusText />
        </p>
        <ul className="mt-0.5 flex flex-col">
          {CONTACTS.map(({ key, label, copyValue, display, href, Icon }) => (
            <li key={key} className="flex items-center gap-2">
              <Icon aria-hidden className="size-3.5 shrink-0 text-faint" />
              <a
                href={href}
                className="truncate text-[13px] text-ink hover:underline focus-visible:outline-2 focus-visible:outline-brand"
              >
                {display}
              </a>
              <CopyButton value={copyValue} label={label.toLowerCase()} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Option B: bidder section that lives inside the grey bid card. */
export function BidderSection() {
  return (
    <div>
      <p className="text-[11px] text-faint">Bidder</p>
      <p className="mt-1 flex items-center gap-2.5">
        <Avatar className="size-7 bg-surface text-[11px]" />
        <span className="text-[14px] font-semibold text-ink">
          {CUSTOMER.name}
        </span>
        <StatusText />
      </p>
      <dl className="mt-2 flex flex-col">
        {CONTACTS.map(({ key, label, copyValue, display, href }) => (
          <div key={key} className="flex items-center gap-3">
            <dt className="w-12 shrink-0 text-[11px] text-faint">{label}</dt>
            <dd className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <a
                href={href}
                className="truncate text-[13px] font-semibold text-ink hover:underline focus-visible:outline-2 focus-visible:outline-brand"
              >
                {display}
              </a>
              <CopyButton value={copyValue} label={label.toLowerCase()} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Option C: two small copyable chips under the title. */
export function ContactChips({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {CONTACTS.map(({ key, label, copyValue, display, href, Icon }) => (
        <li
          key={key}
          className="flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface pl-2.5 pr-1"
        >
          <Icon aria-hidden className="size-3.5 shrink-0 text-faint" />
          <a
            href={href}
            className="text-[12px] text-ink hover:underline focus-visible:outline-2 focus-visible:outline-brand"
          >
            {display}
          </a>
          <CopyButton value={copyValue} label={label.toLowerCase()} />
        </li>
      ))}
    </ul>
  )
}
