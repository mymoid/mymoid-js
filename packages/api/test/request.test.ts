import { describe, expect, it } from "vitest";
import { paymentOrdersQueryToJSON } from "../src/adapters/request";
import { PaymentOrderStatus } from "../src/types";

it("should return correct JSON", () => {
  const query = {
    organizationId: "orgId",
    limit: 10,
    page: 1,
    q: "search",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    maxAmount: 100,
    minAmount: 10,
    status: ["AVAILABLE"] as PaymentOrderStatus[],
    paymentPoints: ["paymentPointId"],
  };
  const result = paymentOrdersQueryToJSON(query);
  expect(result).toEqual({
    organization_id: "orgId",
    start_date: query.startDate,
    end_date: query.endDate,
    max_amount: 100,
    min_amount: 10,
    payment_points: ["paymentPointId"],
    limit: 10,
    page: 1,
    q: "search",
    status: ["AVAILABLE"],
  });
});

it("should return correct JSON when query is empty", () => {
  const query = {
    organizationId: "orgId",
  };
  const result = paymentOrdersQueryToJSON(query);
  expect(result).toEqual({
    organization_id: "orgId",
  });
});
