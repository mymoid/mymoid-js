import { PaymentOrders } from '../../types'

export function buildValidPaymentOrdersList(): PaymentOrders {
  return {
    limit: 10,
    page: 1,
    total_elements: 1,
    number_of_elements: 1,
    last: true,
    first: true,
    empty: false,
    content: [
      {
        payment_order_id: '123',
        amount: 100,
        concept: 'concept',
        creation_date: '2021-01-01T00:00:00.000Z',
        expiration_date: '2021-01-01T00:00:00.000Z',
        currency: 'EUR',
        reference: 'reference',
        short_code: 'short_code',
        status: 'AVAILABLE'
      }
    ]
  }
}
