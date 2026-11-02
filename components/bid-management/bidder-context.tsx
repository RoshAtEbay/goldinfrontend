'use client'

import { useState, type ReactNode } from 'react'
import { Check, Copy, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CUSTOMER, NEW_LEADING_BIDDER } from '@/lib/bids'

function formatPhone(raw: string) {
  const match = raw.match(/^\+1(\d{3})(\d{3})(\d{4})$/)
  return match ? `+1 (${match[1]}) ${match[2]}-${match[3]}` : raw
}

type Person = { name: string; email: string; phone: string }

function contactsFor(person: Person) {
  return [
    {
      key: 'email',
      label: 'Email',
      copyValue: person.email,
      display: person.email,
      href: `mailto:${person.email}`,
      Icon: Mail,
    },
    {
      key: 'phone',
      label: 'Phone',
      copyValue: person.phone,
      display: formatPhone(person.phone),
      href: `tel:${person.phone}`,
      Icon: Phone,
    },
  ]
}

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

export const PLAIN_DL =
  'grid grid-cols-[8.5rem_1fr] items-center gap-x-4 gap-y-1 text-[13px]'

export function FactRow({
  label,
  tone,
  children,
}: {
  label: string
  tone?: string
  children: ReactNode
}) {
  return (
    <>
      <dt className="text-faint">{label}</dt>
      <dd className={cn('min-w-0 font-medium', tone ?? 'text-ink')}>
        {children}
      </dd>
    </>
  )
}

/** Both people affected by the removal, each with their own copyable contact chips. */
export function BothContacts({
  hasNextBidder,
  className,
}: {
  hasNextBidder: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <PersonContacts
        person={CUSTOMER}
        role="Bid being removed"
        nameId="contact-removed"
      />
      {hasNextBidder && (
        <PersonContacts
          person={NEW_LEADING_BIDDER}
          role="Next highest bidder"
          nameId="contact-next"
        />
      )}
    </div>
  )
}

function PersonContacts({
  person,
  role,
  nameId,
}: {
  person: Person
  role: string
  nameId: string
}) {
  return (
    <section aria-labelledby={nameId}>
      <p id={nameId} className="mb-1.5 text-[12px]">
        <span className="font-semibold text-ink">{person.name}</span>
        <span className="text-faint"> · {role}</span>
      </p>
      <ContactChips person={person} />
    </section>
  )
}

function ContactChips({
  person,
  className,
}: {
  person: Person
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {contactsFor(person).map(({ key, label, copyValue, display, href, Icon }) => (
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
