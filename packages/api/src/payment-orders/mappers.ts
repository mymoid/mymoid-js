import {
  PaymentOrdersQueryParameters,
  PaymentOrdersQueryParametersJSON,
  PaymentOrder,
  PaymentOrderJSON
} from './types'

// TODO: improve this function to not "reorder" the query parameters
export function paymentOrdersQueryToJSON(
  query: {
    organizationId: string
  } & PaymentOrdersQueryParameters
): PaymentOrdersQueryParametersJSON {
  const {
    organizationId,
    startDate,
    endDate,
    maxAmount,
    minAmount,
    paymentPoints,
    ...rest
  } = query
  return {
    organization_id: query.organizationId,
    ...(query.startDate && { start_date: startDate }),
    ...(query.endDate && { end_date: endDate }),
    ...(query.maxAmount && { max_amount: maxAmount }),
    ...(query.minAmount && { min_amount: minAmount }),
    ...(query.paymentPoints && { payment_points: paymentPoints }),
    ...rest
  }
}

export function paymentOrdersListFromJSON(
  data: ListJSON<PaymentOrderJSON>
): List<PaymentOrder> {
  return {
    limit: data.limit,
    page: data.page,
    totalElements: data.total_elements,
    numberOfElements: data.number_of_elements,
    last: data.last,
    first: data.first,
    empty: data.empty,
    content: data.content.map((paymentOrder: PaymentOrderJSON) =>
      paymentOrderFromJSON(paymentOrder)
    )
  }
}

function paymentOrderFromJSON(paymentOrder: PaymentOrderJSON): PaymentOrder {
  return {
    paymentOrderId: paymentOrder.payment_order_id,
    amount: paymentOrder.amount,
    concept: paymentOrder.concept,
    creationDate: new Date(paymentOrder.creation_date),
    currency: paymentOrder.currency,
    reference: paymentOrder.reference,
    shortCode: paymentOrder.short_code,
    status: paymentOrder.status
  }
}
