import { PaymentOrdersEndpoints } from "./endpoints/payments/PaymentOrdersEndpoints";
import { Options } from "./types";

const defaultBaseUrl = process.env.MYMOID_BASE_URL ?? "https://apis.mymoid.com";
const defaultApiKey = process.env.MYMOID_API_KEY ?? "";
const defaultOrganizationId = process.env.MYMOID_ORGANIZATION_ID ?? "";

/**
 * The client for interacting with the MYMOID API.
 *
 * @class
 * @public
 */
export class MymoidApi {
  private baseUrl: string;
  private apiKey: string;
  private organizationId: string;
  public paymentOrders: PaymentOrdersEndpoints;

  /**
   * Creates an instance of the MymoidApi.
   * @param {Options} options - The options object containing the API key.
   * @throws Will throw an error if the API key is not provided.
   */
  public constructor(option: Options = {}) {
    this.baseUrl = option.baseUrl ?? defaultBaseUrl;
    this.apiKey = option.apiKey ?? defaultApiKey;
    this.organizationId = option.organizationId ?? defaultOrganizationId;

    if (!this.apiKey) {
      throw Error("API key not found.");
    }
    if (!this.organizationId) {
      throw Error("Organization ID not found.");
    }
    this.paymentOrders = new PaymentOrdersEndpoints(this);
  }

  public getBaseUrl() {
    return this.baseUrl;
  }

  public getApiKey() {
    return this.apiKey;
  }

  public getOrganizationId() {
    return this.organizationId;
  }
}
