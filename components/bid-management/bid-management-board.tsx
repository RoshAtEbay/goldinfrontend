'use client'

import { useState } from 'react'
import { CurrentState } from './current-state'
import { EditBidOption } from './option-a'
import { TableOptionA } from './table-option-a'
import { Switcher } from './variant-switcher'

const SURFACES = [
  { id: 'current', label: 'Current' },
  { id: 'table', label: 'Bids table' },
  { id: 'modal', label: 'Edit bid modal' },
] as const

type SurfaceId = (typeof SURFACES)[number]['id']

const VIEWS: Record<SurfaceId, () => React.JSX.Element> = {
  current: CurrentState,
  table: TableOptionA,
  modal: EditBidOption,
}

const PANEL_ID = 'board-panel'

export function BidManagementBoard() {
  const [surface, setSurface] = useState<SurfaceId>('current')
  const View = VIEWS[surface]

  return (
    <main className="min-h-screen bg-page px-6 py-8">
      <div className="mx-auto mb-6 flex w-full max-w-[1640px] flex-wrap items-center justify-end gap-3">
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
