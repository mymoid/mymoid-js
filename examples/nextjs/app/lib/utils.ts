import { faker } from '@faker-js/faker'

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR'
  })
}

export type FakePaymentOrderData = {
  reference: string
  concept: string
  amount: number
}

export const generateFakePaymentOrderData = (): FakePaymentOrderData => ({
  reference: faker.finance.routingNumber(),
  concept: faker.commerce.productName(),
  amount: Number(faker.finance.amount())
})

export function toCents(value: string | number): number {
  return Number((Number(value) * 100).toFixed())
}
