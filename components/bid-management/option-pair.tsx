import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PanelLabel } from './panel-label'

type Side = {
  title: string
  description: string
  banner: { kind: 'pros' | 'cons'; text: string }
  children: ReactNode
}

const GRID = {
  lg: 'lg:grid-cols-2',
  xl: 'xl:grid-cols-2',
}

const SIDE = {
  lg: 'lg:row-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid',
  xl: 'xl:row-span-3 xl:grid xl:grid-cols-[minmax(0,1fr)] xl:grid-rows-subgrid',
}

const GAP = {
  lg: 'lg:gap-y-0',
  xl: 'xl:gap-y-0',
}

export function OptionPair({
  left,
  right,
  sideBySideFrom = 'lg',
}: {
  left: Side
  right: Side
  sideBySideFrom?: 'lg' | 'xl'
}) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-[1640px] grid-cols-1 gap-x-8 gap-y-12',
        GRID[sideBySideFrom],
        GAP[sideBySideFrom],
      )}
    >
      {[left, right].map((side) => (
        <div key={side.title} className={cn('min-w-0', SIDE[sideBySideFrom])}>
          <PanelLabel
            title={side.title}
            subtitle={side.description}
            stateLabel="Proposed State"
          />
          <div className="min-w-0">{side.children}</div>
          <Banner kind={side.banner.kind} text={side.banner.text} />
        </div>
      ))}
    </div>
  )
}

function Banner({ kind, text }: { kind: 'pros' | 'cons'; text: string }) {
  const pros = kind === 'pros'
  return (
    <p
      role="note"
      className={cn(
        'mt-5 self-start rounded-md px-3.5 py-3 text-[13px] leading-relaxed',
        pros ? 'bg-info-bg text-info-ink' : 'bg-error-bg text-error-ink',
      )}
    >
      <span className="font-semibold">{pros ? 'Pros:' : 'Cons:'}</span> {text}
    </p>
  )
}
