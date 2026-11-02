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

/** Two small copyable chips under the title. */
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
