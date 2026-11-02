export const CUSTOMER = {
  name: 'Adam Bales',
  status: 'ACTIVE',
  registeredOn: '04/13/2026 3:39 PM',
  email: 'adam.s.bales+1@gmail.com',
  phone: '+12539517025',
  shipping: [
    'Adam Bales',
    '11640 sw oak creek drive',
    'portland, oregon 97219',
    'US',
  ],
  payoutAddress: 'Adam Bales',
}

export const NEW_LEADING_BIDDER = {
  name: 'Jordan Reyes',
  maxBid: 150,
}

export const PROFILE_TABS = [
  'Customer Overview',
  'Invoices',
  'Seller Statements',
  'Balance',
  'Shipment Manager',
  'Activity',
  'Bids',
  'Watch List',
  'Consigned Lots',
  'Notes',
  'Merge Accounts',
] as const

export const AUCTION_NAME = 'Gengar'

export const BID = {
  placedAt: '09/25/2026 12:36 PM',
  lotNumber: 2,
  title: 'Pokemon Lot',
  initialMaxBid: 175,
  currentPrice: 175,
  minimumBid: 175,
  biddingPower: 9825,
  winner: true,
  bidCount: 14,
}

export const MAX_BID_INPUT_ID = 'max-bid-input'

export const LOT_LABEL = 'Pokémon Lot'
export const NEXT_BID = 187.5

export const OTHER_BID = {
  placedAt: '09/24/2026 10:00 AM',
  lotNumber: 1,
  title: 'Baseball Card',
  maxBid: 90,
  currentPrice: 90,
  winner: false,
  bidCount: 3,
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatUsd(amount: number) {
  return currency.format(amount)
}

export function parseUsd(input: string) {
  const cleaned = input.replace(/[^0-9.]/g, '')
  if (cleaned === '' || cleaned === '.') return null
  const value = Number(cleaned)
  return Number.isFinite(value) ? value : null
}
