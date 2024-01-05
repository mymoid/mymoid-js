import { describe, expect, it } from "vitest";
import { paymentOrdersListFromJSON } from "../src/adapters/response";
import { PaymentOrderStatus } from "../src/types";
import { buildValidPaymentOrdersList } from "./data/validPaymentOrders";

it("should return a list of payment orders", () => {
  const paymentOrders = paymentOrdersListFromJSON(buildValidPaymentOrdersList());
  expect(paymentOrders).toEqual({
    limit: 10,
    page: 1,
    totalElements: 1,
    numberOfElements: 1,
    last: true,
    first: true,
    empty: false,
    content: [
      {
        paymentOrderId: "123",
        amount: 100,
        concept: "concept",
        creationDate: new Date("2021-01-01T00:00:00.000Z"),
        currency: "EUR",
        reference: "reference",
        shortCode: "short_code",
        status: "AVAILABLE",
      },
    ],
  });
});
