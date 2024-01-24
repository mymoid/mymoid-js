import { buildValidPaymentOrder } from '.'
import { Decamelize } from '../../../shared/types'
import { PaymentOrders } from '../../types'

export function buildValidPaymentOrdersList(): Decamelize<PaymentOrders> {
  return {
    limit: 10,
    page: 1,
    total_elements: 1,
    number_of_elements: 1,
    last: true,
    first: true,
    empty: false,
    content: [buildValidPaymentOrder()]
  }
}
