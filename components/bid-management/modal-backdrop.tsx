import type { ReactNode } from 'react'

const PAGE_FRAGMENTS = [
  { text: 'Sh', className: 'left-1.5 top-[50px] text-[15px] font-bold' },
  { text: 'Ad', className: 'left-1.5 top-[68px] text-[10px]' },
  { text: '11', className: 'left-1.5 top-[80px] text-[10px]' },
  { text: 'po', className: 'left-1.5 top-[92px] text-[10px]' },
  { text: 'US', className: 'left-1.5 top-[104px] text-[10px]' },
  { text: 'rview', className: 'left-0 top-[126px] text-[10px]' },
  { text: 'All L', className: 'left-0 top-[182px] text-[11px]' },
  { text: 'V', className: 'right-0 top-[126px] text-[10px]' },
]

const PAGE_RULES = ['top-[152px]', 'top-[212px]', 'top-[240px]', 'top-[268px]']

export function ModalBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[380px] overflow-hidden rounded-sm bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 text-[#222]">
        {PAGE_FRAGMENTS.map(({ text, className }) => (
          <span key={text} className={`absolute leading-none ${className}`}>
            {text}
          </span>
        ))}
        {PAGE_RULES.map((top) => (
          <span key={top} className={`absolute inset-x-0 h-px bg-[#bbb] ${top}`} />
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-y-3 left-6 right-3.5 flex">{children}</div>
    </div>
  )
}
