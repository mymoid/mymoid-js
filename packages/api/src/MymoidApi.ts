import PaymentOrdersEndpoints from "./endpoints/payments/PaymentOrdersEndpoints";
import { Options } from "./types";

const defaultbaseUrl = process.env.MYMOID_BASE_URL ?? "https://apis.mymoid.com";
const defaultApiKey = process.env.MYMOID_API_KEY ?? "";
const defaultOrganizationId = process.env.MYMOID_ORGANIZATION_ID ?? "";

/**
 * The client for interacting with the MYMOID API.
 */
export class MymoidApi {
  /**
   * The root URL of the MYMOID API.
   */
  private baseUrl: string;
  /**
   * The API key used for authentication.
   */
  private apiKey: string;
  /**
   * The organization ID used for authentication.
   */
  private organizationId: string;
  /**
   * The Payment Orders resource for making specific API requests.
   */
  public paymentOrders: PaymentOrdersEndpoints;

  /**
   * Creates an instance of the MymoidApi.
   * @param {Options} options - The options object containing the API key.
   * @throws Will throw an error if the API key is not provided.
   */
  public constructor(option: Options = {}) {
    this.baseUrl = option.baseUrl ?? defaultbaseUrl;
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

  /**
   * Gets the organization ID.
   */
  public getOrganizationId() {
    return this.organizationId;
  }

  /**
   * Makes a request to the MYMOID API. This method is used internally by the SDK.
   * @param {string} method - The HTTP method.
   * @param {string} url - The URL of the resource.
   * @param {any} body - The request body.
   * @param {string} contentType - The content type of the request.
   * @returns {Promise<any>} - The response data.
   * @throws Will throw an error if the response is not successful.
   *
   * @example
   * const response = await api.makeRequest("GET", "payments/v1/payment-orders");
   *
   *
   */
  public async makeRequest<TReturnType>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body: any = undefined,
    contentType: string | undefined = undefined
  ): Promise<TReturnType> {
    try {
      const accessToken = this.apiKey;
      const fullUrl = this.baseUrl + url;
      const opts: RequestInit = {
        method: method,
        headers: {
          "x-organization-id": this.organizationId,
          "x-api-key": accessToken,
          "Content-Type": contentType ?? "application/json",
        },
        body: body
          ? typeof body === "string"
            ? body
            : JSON.stringify(body)
          : undefined,
      };

      const response = await fetch(fullUrl, opts);
      await this.validateResponse(response);
      if (response.status === 204) {
        return null as TReturnType;
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  private async validateResponse(response: Response): Promise<void> {
    switch (response.status) {
      case 401:
        throw new Error(
          "Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user."
        );
      case 403:
        const body = await response.text();
        throw new Error(
          `Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here. Body: ${body}`
        );
      case 429:
        throw new Error("The app has exceeded its rate limits.");
      case 500:
        throw new Error("Internal error.");
      default:
        if (!response.status.toString().startsWith("20")) {
          const body = await response.text();
          throw new Error(
            `Unrecognised response code: ${response.status} - ${response.statusText}. Body: ${body}`
          );
        }
    }
  }
}
