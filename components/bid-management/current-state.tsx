'use client'

import { useState } from 'react'
import { BID } from '@/lib/bids'
import { PanelLabel } from './panel-label'
import { UserProfileBids } from './user-profile-bids'
import { EditBidModal } from './edit-bid-modal'
import { ModalBackdrop } from './modal-backdrop'

export function CurrentState() {
  const [maxBid, setMaxBid] = useState(BID.initialMaxBid)

  return (
    <div className="mx-auto grid w-full max-w-[1640px] grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-y-0">
      <div className="min-w-0 lg:row-span-2 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
        <PanelLabel
          title="User Profile — Bids Tab"
          subtitle="Where CS reps view a customer's active bids"
          whenToUse="A customer calls about a bid issue. CS looks up the user, navigates to the Bids tab, and sees all active bids."
        />
        <div className="self-start">
          <UserProfileBids maxBid={maxBid} />
        </div>
      </div>

      <div className="min-w-0 lg:row-span-2 lg:grid lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid">
        <PanelLabel
          title="Edit Bid Modal"
          subtitle="The only current action available on a bid row"
          whenToUse="CS can reduce a max bid amount. They cannot remove a bid entirely — that requires a manual database change by an engineer."
        />
        <div className="self-start">
          <ModalBackdrop>
            <EditBidModal onConfirm={setMaxBid} />
          </ModalBackdrop>
          <p
            role="note"
            className="mt-4 rounded-md bg-error-bg px-3.5 py-3 text-[13px] leading-relaxed text-error-ink"
          >
            Limitation: CS reps can reduce a max bid but cannot remove it
            entirely. Removing a bid requires a manual database change by an
            engineer via Slack.
          </p>
        </div>
      </div>
    </div>
  )
}
