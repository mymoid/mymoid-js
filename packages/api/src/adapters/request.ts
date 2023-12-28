import {
  PaymentOrdersQueryParameters,
  PaymentOrdersQueryParametersJSON,
} from "../types";

export function paymentOrdersQueryToJSON(
  query: {
    organizationId: string;
  } & PaymentOrdersQueryParameters
): PaymentOrdersQueryParametersJSON {
  return {
    organization_id: query.organizationId,
    start_date: query.startDate,
    end_date: query.endDate,
    max_amount: query.maxAmount,
    min_amount: query.minAmount,
    payment_points: query.paymentPoints,
    ...query,
  };
}
