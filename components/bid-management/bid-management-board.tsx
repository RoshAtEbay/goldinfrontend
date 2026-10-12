'use client'

import { useState } from 'react'
import { CurrentState } from './current-state'
import { OptionA } from './option-a'
import { OptionB } from './option-b'
import { TableOptionA } from './table-option-a'
import { TableOptionC as TableOptionB } from './table-option-c'
import { Switcher } from './variant-switcher'

const SURFACES = [
  { id: 'current', label: 'Current' },
  { id: 'table', label: 'Bids table' },
  { id: 'modal', label: 'Edit bid modal' },
] as const

type SurfaceId = (typeof SURFACES)[number]['id']
type OptionId = 'a' | 'b'

const OPTIONS: Record<
  Exclude<SurfaceId, 'current'>,
  readonly { id: OptionId; label: string }[]
> = {
  table: [
    { id: 'a', label: 'Option A' },
    { id: 'b', label: 'Option B' },
  ],
  modal: [
    { id: 'a', label: 'Option A' },
    { id: 'b', label: 'Option B' },
  ],
}

const VIEWS: Record<
  Exclude<SurfaceId, 'current'>,
  Partial<Record<OptionId, () => React.JSX.Element>>
> = {
  table: { a: TableOptionA, b: TableOptionB },
  modal: { a: OptionA, b: OptionB },
}

const PANEL_ID = 'board-panel'

export function BidManagementBoard() {
  const [surface, setSurface] = useState<SurfaceId>('current')
  const [options, setOptions] = useState<Record<'table' | 'modal', OptionId>>({
    table: 'a',
    modal: 'a',
  })

  const View =
    surface === 'current'
      ? CurrentState
      : (VIEWS[surface][options[surface]] ?? CurrentState)

  return (
    <main className="min-h-screen bg-page px-6 py-8">
      <div className="mx-auto mb-6 flex w-full max-w-[1640px] flex-wrap items-center justify-end gap-3">
        {surface !== 'current' && (
          <Switcher
            label={`${surface === 'table' ? 'Bids table' : 'Edit bid modal'} option`}
            prefix="option"
            options={OPTIONS[surface]}
            value={options[surface]}
            onChange={(id) => setOptions((prev) => ({ ...prev, [surface]: id }))}
            controls={PANEL_ID}
          />
        )}
        <Switcher
          label="Design surface"
          prefix="surface"
          options={SURFACES}
          value={surface}
          onChange={setSurface}
          controls={PANEL_ID}
        />
      </div>
      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={`surface-tab-${surface}`}
      >
        <View />
      </div>
    </main>
  )
}
