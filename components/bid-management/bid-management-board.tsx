'use client'

import { useState } from 'react'
import { CurrentState } from './current-state'
import { OptionA } from './option-a'
import { OptionB } from './option-b'
import { OptionC } from './option-c'
import {
  VariantSwitcher,
  panelId,
  tabId,
  type VariantId,
} from './variant-switcher'

const VIEWS: Record<VariantId, () => React.JSX.Element> = {
  current: CurrentState,
  a: OptionA,
  b: OptionB,
  c: OptionC,
}

export function BidManagementBoard() {
  const [variant, setVariant] = useState<VariantId>('current')
  const View = VIEWS[variant]

  return (
    <main className="min-h-screen bg-page px-6 py-8">
      <div className="mx-auto mb-6 flex w-full max-w-[1640px] justify-end">
        <VariantSwitcher value={variant} onChange={setVariant} />
      </div>
      <div role="tabpanel" id={panelId(variant)} aria-labelledby={tabId(variant)}>
        <View />
      </div>
    </main>
  )
}
