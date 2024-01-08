import { describe, beforeEach, expect, it, vi } from "vitest";
import { MymoidApi } from "../src/MymoidApi";
import { buildValidPaymentOrdersList } from "./data/validPaymentOrders";
import { PaymentOrderStatus } from "../src/types";

const fetch = vi.spyOn(global, 'fetch')

describe("MymoidApi - Payment orders list", () => {
  beforeEach(() => {
    const paymentOrdersList = buildValidPaymentOrdersList();
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(paymentOrdersList),
      } as Response)
    );
  });

  afterEach(() => {
    fetch.mockReset();
  });

  it("Api fetch should be called with query parameters", async () => {
    const mymoidApi = new MymoidApi({
      apiKey: "KEY_1234567890",
      organizationId: "ORG_12345",
      baseUrl: "https://apis.test.mymoid.com",
    });
    await mymoidApi.paymentOrders.getList({
      page: 1,
      limit: 10,
      q: "q",
      startDate: new Date("2023-12-31").toISOString(),
      endDate: new Date("2023-12-31").toISOString(),
      maxAmount: 100000,
      minAmount: 0,
      status: ["AVAILABLE"] as PaymentOrderStatus[],
      paymentPoints: ["paymentPoints1", "paymentPoints2"],
    });

    expect(fetch).toBeCalledWith(
      "https://apis.test.mymoid.com/payments/v1/payment-orders?organization_id=ORG_12345&start_date=2023-12-31T00%3A00%3A00.000Z&end_date=2023-12-31T00%3A00%3A00.000Z&max_amount=100000&payment_points=paymentPoints1%2CpaymentPoints2&page=1&limit=10&q=q&status=AVAILABLE",
      {
        body: undefined,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "KEY_1234567890",
          "x-organization-id": "ORG_12345",
        },
        method: "GET",
      }
    );
  });

  it("Should return a payment orders list", async () => {
    const mymoidApi = new MymoidApi({
      apiKey: "KEY_1234567890",
      organizationId: "ORG_12345",
      baseUrl: "https://apis.test.mymoid.com",
    });
    const response = await mymoidApi.paymentOrders.getList();
    expect(response).toEqual({
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
          creationDate: new Date("2021-01-01"),
          currency: "EUR",
          reference: "reference",
          shortCode: "short_code",
          status: "AVAILABLE",
        },
      ],
    });
  });
});
