import { EndpointsBase } from '../shared/endpoints-base'
import { createUrlParamsString } from '../shared/utils'
import { paymentOrdersListFromJSON, paymentOrdersQueryToJSON } from './mappers'
import {
  PaymentOrder,
  PaymentOrderJSON,
  PaymentOrdersQueryParameters
} from './types'
import { List, ListJSON } from '../shared/types'

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
    query?: PaymentOrdersQueryParameters
  ): Promise<List<PaymentOrder>> {
    const organizationId = this.api.getOrganizationId()
    const params = createUrlParamsString(
      paymentOrdersQueryToJSON({
        organizationId,
        ...query
      })
    )

    const response = await this.getRequest<ListJSON<PaymentOrderJSON>>(
      PaymentOrdersEndpoints.paymentsApi + `/payment-orders${params}`
    )
    return paymentOrdersListFromJSON(response)
  }
}
