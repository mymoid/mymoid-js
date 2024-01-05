import { describe, beforeEach, expect, it, vi } from "vitest";
import { MymoidApi } from "../src/MymoidApi";
import { buildValidApiError } from "./data/validApiError";

global.fetch = vi.fn();

describe("ApiError", () => {
  beforeEach(() => {
    const apiError = buildValidApiError();
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(apiError),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockReset();
  });

  it("Should return an ApiError when response is not ok", async () => {
    const mymoidApi = new MymoidApi({
      apiKey: "KEY_1234567890",
      organizationId: "ORG_12345",
      baseUrl: "https://apis.test.mymoid.com",
    });
    await expect(
      async () =>
        await mymoidApi.paymentOrders.getList().catch((error) => {
          throw JSON.stringify(error);
        })
    ).rejects.toThrow(
      `{"message":"Bad Request","code":"400","status":400,"origin":"API","details":[{"message":"Invalid request"}]}`
    );
  });
});
