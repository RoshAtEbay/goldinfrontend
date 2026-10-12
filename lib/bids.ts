export const CUSTOMER = {
  name: 'Adam Bales',
  email: 'adambales@goldin.co',
  phone: '+13604857425',
  shipping: ['123 Main St', 'Portland, Oregon', 'United States, 97201'],
  payoutAddress: 'Adam Bales',
}

export const PROFILE_TABS = [
  'Customer Invoices',
  'Auctions',
  'Seller Statements',
  'Shipment Manager',
  'Billing',
  'Bids',
  'Wish List',
  'Consigned Lots',
  'Invoices',
  'Merge Accounts',
] as const

export const BID = {
  placedAt: '09/19/2026 12:15 PM',
  lotNumber: 4,
  title: 'Pokémon Lot',
  initialMaxBid: 175,
  currentPrice: 150,
  winner: true,
  bidCount: 14,
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
