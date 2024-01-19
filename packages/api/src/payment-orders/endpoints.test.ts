import { describe, beforeEach, expect, it, vi } from 'vitest'
import {
  buildValidPaymentOrdersList,
  buildValidPaymentOrder
} from './test/data'
import { MymoidApi } from '../api'
import { PaymentOrderStatus, type PaymentOrder, PaymentOrders } from './types'
import { Camelize } from '../shared/types'

const fetchSpy = vi.spyOn(global, 'fetch')
const mymoidApi = new MymoidApi({
  apiKey: 'KEY_1234567890',
  organizationId: 'ORG_12345',
  baseUrl: 'https://apis.test.mymoid.com'
})

describe('Payment orders list', () => {
  beforeEach(() => {
    const paymentOrdersList = buildValidPaymentOrdersList()
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(paymentOrdersList)
      } as Response)
    )
  })

  afterEach(() => {
    fetchSpy.mockReset()
  })

  it('should be called with query parameters', async () => {
    await mymoidApi.paymentOrders.get({
      startDate: new Date('2023-12-31').toISOString(),
      endDate: new Date('2023-12-31').toISOString(),
      maxAmount: 100000,
      paymentPoints: ['paymentPoints1', 'paymentPoints2'],
      page: 1,
      limit: 10,
      q: 'q',
      status: ['AVAILABLE'] as PaymentOrderStatus[]
    })
    expect(fetchSpy).toBeCalledWith(
      'https://apis.test.mymoid.com/payments/v1/payment-orders?organization_id=ORG_12345&start_date=2023-12-31T00%3A00%3A00.000Z&end_date=2023-12-31T00%3A00%3A00.000Z&max_amount=100000&payment_points=paymentPoints1%2CpaymentPoints2&page=1&limit=10&q=q&status=AVAILABLE',
      {
        body: undefined,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'KEY_1234567890',
          'x-organization-id': 'ORG_12345'
        },
        method: 'GET'
      }
    )
  })

  it('should return a payment orders list camelize', async () => {
    const response: Camelize<PaymentOrders> =
      await mymoidApi.paymentOrders.get()
    expect(response).toEqual({
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
          creationDate: '2021-01-01T00:00:00.000Z',
          expirationDate: '2021-01-03T00:00:00.000Z',
          currency: 'EUR',
          reference: 'reference',
          shortCode: 'short_code',
          status: 'AVAILABLE'
        }
      ]
    })
  })
})

describe('Payment order details', () => {
  beforeEach(() => {
    const paymentOrder = buildValidPaymentOrder()
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(paymentOrder)
      } as Response)
    )
  })

  afterEach(() => {
    fetchSpy.mockReset()
  })

  it('should call fetch with payment order id', async () => {
    await mymoidApi.paymentOrders.getById('123')
    expect(fetchSpy).toBeCalledWith(
      'https://apis.test.mymoid.com/payments/v1/payment-orders/123',
      {
        body: undefined,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'KEY_1234567890',
          'x-organization-id': 'ORG_12345'
        },
        method: 'GET'
      }
    )
  })
  it("should return a payment order's details camelize", async () => {
    const response: Camelize<PaymentOrder> =
      await mymoidApi.paymentOrders.getById('123')
    expect(response).toEqual({
      paymentOrderId: '123',
      amount: 100,
      concept: 'concept',
      creationDate: '2021-01-01T00:00:00.000Z',
      expirationDate: '2021-01-03T00:00:00.000Z',
      currency: 'EUR',
      reference: 'reference',
      shortCode: 'short_code',
      status: 'AVAILABLE'
    })
  })
})

describe('Payment order refund', () => {
  const expectedHttpMethod = 'POST'
  const expectedHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': 'KEY_1234567890',
    'x-organization-id': 'ORG_12345'
  }

  beforeEach(() => {
    const paymentOrder = buildValidPaymentOrder({
      payment_order_id: '123456789',
      status: 'REFUNDED'
    })
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(paymentOrder)
      } as Response)
    )
  })

  afterEach(() => {
    fetchSpy.mockReset()
  })

  it('should call fetch with payment order id and body amount', async () => {
    await mymoidApi.paymentOrders.refund('123456789', 100)
    expect(fetchSpy).toBeCalledWith(
      'https://apis.test.mymoid.com/payments/v1/payment-orders/123456789',
      {
        body: JSON.stringify({ amount: 100 }),
        headers: expectedHeaders,
        method: expectedHttpMethod
      }
    )
  })
  it('should call fetch with payment order id and NOT body amount', async () => {
    await mymoidApi.paymentOrders.refund('123456789')
    expect(fetchSpy).toBeCalledWith(
      'https://apis.test.mymoid.com/payments/v1/payment-orders/123456789',
      {
        body: undefined,
        headers: expectedHeaders,
        method: expectedHttpMethod
      }
    )
  })
  it("should return a payment order's details camelize", async () => {
    const response: Camelize<PaymentOrder> =
      await mymoidApi.paymentOrders.refund('123456789')
    expect(response).toEqual({
      paymentOrderId: '123456789',
      amount: 100,
      concept: 'concept',
      creationDate: '2021-01-01T00:00:00.000Z',
      expirationDate: '2021-01-03T00:00:00.000Z',
      currency: 'EUR',
      reference: 'reference',
      shortCode: 'short_code',
      status: 'REFUNDED'
    })
  })
})
