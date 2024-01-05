import { MymoidApi } from "./MymoidApi";
import { ApiError } from "./ApiError";
import { MymoidApiError } from "./types";

/**
 * Makes a request to the MYMOID API. This method is used internally by the SDK.
 * @param {string} method - The HTTP method.
 * @param {string} url - The URL of the resource.
 * @param {any} body - The request body.
 * @param {string} contentType - The content type of the request.
 * @returns {Promise<TReturnType>} - The response data.
 * @throws {ApiError} Will throw an error if the response is not successful.
 *
 * @example
 * const response = await api.makeRequest("GET", "payments/v1/payment-orders");
 *
 *
 */
export async function makeRequest<TReturnType>(
  api: MymoidApi,
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body: any = undefined,
  contentType: string | undefined = undefined
): Promise<TReturnType> {
  const apiKey = api.getApiKey();
  const baseUrl = api.getBaseUrl();
  const fullUrl = baseUrl + url;
  const organizationId = api.getOrganizationId();
  const headers = {
    "x-organization-id": organizationId,
    "x-api-key": apiKey,
    "Content-Type": contentType ?? "application/json",
  };

  try {
    const opts: RequestInit = {
      method,
      headers,
      body: body
        ? typeof body === "string"
          ? body
          : JSON.stringify(body)
        : undefined,
    };
    const response = await fetch(fullUrl, opts);
    if (!response.ok) {
      const errorResponse = await response.json();
      await handleError(errorResponse);
    }
    if (response.status === 204) {
      return null as TReturnType;
    }
    return await response.json();
  } catch (error) {
    // TODO: Add logic to this catch clause or eliminate it and rethrow the exception automatically. [sonarlint(typescript:S2737)]
    throw error;
  }
}

async function handleError(error: MymoidApiError): Promise<MymoidApiError> {
  throw new ApiError({
    code: error.code,
    message: error.message,
    status: error.status,
    origin: error.origin,
    details: error.details.map((detail: { message: string }) => {
      return { message: detail.message };
    }),
  });
}

export function createUrlParamsString(args: any): string {
  const params = new URLSearchParams();
  for (let key of Object.getOwnPropertyNames(args)) {
    if (
      args[key] ||
      args[key] === 0 ||
      (!args[key] && typeof args[key] === "boolean")
    ) {
      params.append(key, args[key].toString());
    }
  }
  return [...params].length > 0 ? `?${params.toString()}` : "";
}
