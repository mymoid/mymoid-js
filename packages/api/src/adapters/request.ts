import {
  PaymentOrdersQueryParameters,
  PaymentOrdersQueryParametersJSON,
} from "../types";

export function paymentOrdersQueryToJSON(
  query: {
    organizationId: string;
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
  } = query;
  return {
    organization_id: query.organizationId,
    ...(query.startDate && { start_date: startDate }),
    ...(query.endDate && { end_date: endDate }),
    ...(query.maxAmount && { max_amount: maxAmount }),
    ...(query.minAmount && { min_amount: minAmount }),
    ...(query.paymentPoints && { payment_points: paymentPoints }),
    ...rest,
  };
}
