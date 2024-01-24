import { EndpointsBase } from '../shared/endpoints-base'
import { camelize, createUrlParamsString, decamelize } from '../shared/utils'
import {
  PaymentOrderCreationParameters,
  PaymentOrder,
  PaymentOrders,
  PaymentOrdersQueryParameters
} from './types'
import { Camelize } from '../shared/types'

export class PaymentOrdersEndpoints extends EndpointsBase {
  private static paymentsApi: string = '/payments/v1'

  /**
   * Create a new payment order.
   *
   * @see https://developers.mymoid.com/api-reference#/operations/Create
   *
   * @param paymentOrder Details of the payment order to be created.
   * @returns A Promise that resolves to the created payment order.
   *
   */
  public async create(
    paymentOrder: PaymentOrderCreationParameters
  ): Promise<Camelize<PaymentOrder>> {
    const response: PaymentOrder = await this.postRequest(
      PaymentOrdersEndpoints.paymentsApi + '/payment-orders',
      decamelize(paymentOrder)
    )

    return camelize(response)
  }

  /**
   * Get payment order by id.
   *
   * @see https://developers.mymoid.com/api-reference#/operations/GetPaymentOrderByPaymentOrderId
   *
   * @param id Payment order id.
   * @returns A Promise that resolves to the payment order.
   *
   * @throws {ApiError}
   * This exception is thrown if the payment order is not found.
   */
  public async getById(id: string): Promise<Camelize<PaymentOrder>> {
    const response: PaymentOrder = await this.getRequest(
      PaymentOrdersEndpoints.paymentsApi + `/payment-orders/${id}`
    )
    return camelize(response)
  }

  /**
   * Get payment orders page by query parameters.
   *
   * @see https://developers.mymoid.com/api-reference#/operations/search-payment-orders
   *
   * @param query Query parameters.
   * @returns A Promise that resolves to the payment orders list.
   *
   */
  public async get(
    query?: Camelize<PaymentOrdersQueryParameters>
  ): Promise<Camelize<PaymentOrders>> {
    const organizationId = this.api.getOrganizationId()
    const params = createUrlParamsString(
      decamelize({
        organizationId,
        ...query
      })
    )

    const response: PaymentOrders = await this.getRequest(
      PaymentOrdersEndpoints.paymentsApi + `/payment-orders${params}`
    )

    return camelize(response)
  }

  /**
   * Refund payment order (Paid, Partially Refunded).
   *
   * @see https://developers.mymoid.com/api-reference#/operations/Refund
   *
   * @param id Payment order id.
   * @param Amount to be refunded. This should be an integer value
   * (decimals are not accepted) and represents the value in cents. If the amount is
   * not provided, the entire payment order amount will be refunded.
   *
   * @returns A Promise that resolves to the payment order.
   *
   * @throws {ApiError}
   * This exception is thrown if the payment order is not found.
   */
  public async refund(
    id: string,
    amount?: number
  ): Promise<Camelize<PaymentOrder>> {
    const response: PaymentOrder = await this.postRequest(
      PaymentOrdersEndpoints.paymentsApi + `/payment-orders/${id}/refund`,
      amount && { amount }
    )
    return camelize(response)
  }
}
