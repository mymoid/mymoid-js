import { PaymentOrder } from '../../types'

export function buildValidPaymentOrder(
  paymentOrder?: Partial<PaymentOrder>
): PaymentOrder {
  return {
    payment_order_id: '123',
    amount: 100,
    concept: 'concept',
    creation_date: '2021-01-01T00:00:00.000Z',
    expiration_date: '2021-01-03T00:00:00.000Z',
    currency: 'EUR',
    reference: 'reference',
    short_code: 'short_code',
    status: 'AVAILABLE',
    ...paymentOrder
  }
}