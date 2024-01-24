import { EndpointsBase } from '../shared/endpoints-base'
import { camelize, createUrlParamsString, decamelize } from '../shared/utils'
import {
  PaymentOrderCreationParameters,
  PaymentOrder,
  PaymentOrders,
  PaymentOrdersQueryParameters
} from './types'
import { Camelize, Decamelize } from '../shared/types'

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
  ): Promise<PaymentOrder> {
    const response = await this.postRequest<Decamelize<PaymentOrder>>(
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
  public async getById(id: string): Promise<PaymentOrder> {
    const response = await this.getRequest<Decamelize<PaymentOrder>>(
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
    query?: PaymentOrdersQueryParameters
  ): Promise<PaymentOrders> {
    const organizationId = this.api.getOrganizationId()
    const params = createUrlParamsString(
      decamelize({
        organizationId,
        ...query
      })
    )

    const response = await this.getRequest<Decamelize<PaymentOrders>>(
      PaymentOrdersEndpoints.paymentsApi + `/payment-orders${params}`
    )

    return camelize(response)
  }
}
