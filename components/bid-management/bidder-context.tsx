'use client'

import { useState, type ReactNode } from 'react'
import { Check, Copy, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatPhone(raw: string) {
  const match = raw.match(/^\+1(\d{3})(\d{3})(\d{4})$/)
  return match ? `+1 (${match[1]}) ${match[2]}-${match[3]}` : raw
}

export type Person = { name: string; email: string; phone: string }

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

/** Two small copyable chips (email, phone) for one person. */
export function ContactChips({
  person,
  compact,
  className,
}: {
  person: Person
  compact?: boolean
  className?: string
}) {
  return (
    <ul
      className={cn(
        'flex gap-1.5',
        compact ? 'flex-nowrap gap-1' : 'flex-wrap',
        className,
      )}
    >
      {contactsFor(person).map(({ key, label, copyValue, display, href, Icon }) => (
        <li
          key={key}
          className={cn(
            'flex items-center rounded-full border border-line bg-surface',
            compact ? 'h-7 gap-1 pl-2 pr-0.5' : 'h-8 gap-1.5 pl-2.5 pr-1',
          )}
        >
          <Icon aria-hidden className="size-3.5 shrink-0 text-faint" />
          <a
            href={href}
            className={cn(
              'whitespace-nowrap text-ink hover:underline focus-visible:outline-2 focus-visible:outline-brand',
              compact ? 'text-[11px]' : 'text-[12px]',
            )}
          >
            {display}
          </a>
          <CopyButton value={copyValue} label={label.toLowerCase()} />
        </li>
      ))}
    </ul>
  )
}
