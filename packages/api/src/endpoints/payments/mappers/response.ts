import { List, ListJSON, PaymentOrder, PaymentOrderJSON } from "../../../types";

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
    ),
  };
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
    status: paymentOrder.status,
  };
}
