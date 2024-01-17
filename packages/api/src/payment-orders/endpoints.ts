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
   * Get payment orders page by query parameters.
   *
   * @see https://developers.mymoid.com/api-reference#/operations/search-payment-orders
   *
   * @param query Query parameters.
   * @returns Payment orders page.
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
}
