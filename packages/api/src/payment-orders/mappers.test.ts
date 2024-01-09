import { describe, expect, it } from 'vitest'
import { paymentOrdersListFromJSON, paymentOrdersQueryToJSON } from './mappers'
import { buildValidPaymentOrdersList } from './test/data/valid-payment-orders'
import { PaymentOrderStatus } from './types'

describe('Payment orders - mappers', () => {
  it('should map incoming payment order list object to camel case format', () => {
    const paymentOrders = paymentOrdersListFromJSON(
      buildValidPaymentOrdersList()
    )
    expect(paymentOrders).toEqual({
      limit: 10,
      page: 1,
      totalElements: 1,
      numberOfElements: 1,
      last: true,
      first: true,
      empty: false,
      content: [
        {
          paymentOrderId: '123',
          amount: 100,
          concept: 'concept',
          creationDate: new Date('2021-01-01T00:00:00.000Z'),
          currency: 'EUR',
          reference: 'reference',
          shortCode: 'short_code',
          status: 'AVAILABLE'
        }
      ]
    })
  })

  it('should map incoming query object to kebab case format when query empty', () => {
    const query = {
      organizationId: 'orgId'
    }
    const result = paymentOrdersQueryToJSON(query)
    expect(result).toEqual({
      organization_id: 'orgId'
    })
  })

  it('should map incoming query object to kebab case format', () => {
    const query = {
      organizationId: 'orgId',
      limit: 10,
      page: 1,
      q: 'search',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      maxAmount: 100,
      minAmount: 10,
      status: ['AVAILABLE'] as PaymentOrderStatus[],
      paymentPoints: ['paymentPointId']
    }
    const result = paymentOrdersQueryToJSON(query)
    expect(result).toEqual({
      organization_id: 'orgId',
      start_date: query.startDate,
      end_date: query.endDate,
      max_amount: 100,
      min_amount: 10,
      payment_points: ['paymentPointId'],
      limit: 10,
      page: 1,
      q: 'search',
      status: ['AVAILABLE']
    })
  })
})
