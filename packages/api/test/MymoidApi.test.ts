import { describe, beforeEach, expect, it, vi } from "vitest";
import { MymoidApi } from "../src/MymoidApi";
import { buildValidPaymentOrdersList } from "./data/validPaymentOrders";
import { PaymentOrderStatus } from "../src/types";

global.fetch = vi.fn();

describe("MymoidApi", () => {
  beforeEach(() => {
    const paymentOrdersList = buildValidPaymentOrdersList();
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(paymentOrdersList),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockReset();
  });

  it("Should setting using Options", () => {
    const mymoidApi = new MymoidApi({
      apiKey: "KEY_1234567890",
      organizationId: "ORG_1234567890",
      baseUrl: "https://apis.test.mymoid.com",
    });
    const apikey = mymoidApi.getApiKey();
    const organizationId = mymoidApi.getOrganizationId();
    const baseUrl = mymoidApi.getBaseUrl();

    expect(mymoidApi).toBeInstanceOf(MymoidApi);
    expect(apikey).toEqual("KEY_1234567890");
    expect(organizationId).toEqual("ORG_1234567890");
    expect(baseUrl).toEqual("https://apis.test.mymoid.com");
  });

  it("Should it call fetch with query parameters", async () => {
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
    const paymentOrdersList = buildValidPaymentOrdersList();
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(paymentOrdersList),
      })
    );

    const mymoidApi = new MymoidApi({
      apiKey: "KEY_1234567890",
      organizationId: "ORG_12345",
      baseUrl: "https://apis.test.mymoid.com",
    });
    const response = await mymoidApi.paymentOrders.getList();
    expect(fetch).toBeCalledWith(
      "https://apis.test.mymoid.com/payments/v1/payment-orders?organization_id=ORG_12345",
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
          creationDate: new Date(paymentOrdersList.content[0].creation_date),
          currency: "EUR",
          reference: "reference",
          shortCode: "short_code",
          status: "AVAILABLE",
        },
      ],
    });
  });

});
