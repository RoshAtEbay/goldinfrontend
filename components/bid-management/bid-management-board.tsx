'use client'

import { useState } from 'react'
import { CurrentState } from './current-state'
import { OptionA } from './option-a'
import { OptionB } from './option-b'
import { OptionC } from './option-c'
import { TableOptionA } from './table-option-a'
import { TableOptionB } from './table-option-b'
import { TableOptionC } from './table-option-c'
import { Switcher } from './variant-switcher'

const SURFACES = [
  { id: 'current', label: 'Current' },
  { id: 'table', label: 'Bids table' },
  { id: 'modal', label: 'Edit bid modal' },
] as const

const OPTIONS = [
  { id: 'a', label: 'Option A' },
  { id: 'b', label: 'Option B' },
  { id: 'c', label: 'Option C' },
] as const

type SurfaceId = (typeof SURFACES)[number]['id']
type OptionId = (typeof OPTIONS)[number]['id']

const VIEWS: Record<
  Exclude<SurfaceId, 'current'>,
  Record<OptionId, () => React.JSX.Element>
> = {
  table: { a: TableOptionA, b: TableOptionB, c: TableOptionC },
  modal: { a: OptionA, b: OptionB, c: OptionC },
}

const PANEL_ID = 'board-panel'

export function BidManagementBoard() {
  const [surface, setSurface] = useState<SurfaceId>('current')
  const [options, setOptions] = useState<Record<'table' | 'modal', OptionId>>({
    table: 'a',
    modal: 'a',
  })

  const View =
    surface === 'current' ? CurrentState : VIEWS[surface][options[surface]]

  return (
    <main className="min-h-screen bg-page px-6 py-8">
      <div className="mx-auto mb-6 flex w-full max-w-[1640px] flex-wrap items-center justify-end gap-3">
        {surface !== 'current' && (
          <Switcher
            label={`${surface === 'table' ? 'Bids table' : 'Edit bid modal'} option`}
            prefix="option"
            options={OPTIONS}
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
