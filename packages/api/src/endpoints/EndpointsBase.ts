import { MymoidApi } from "../MymoidApi";
import { makeRequest } from "../utils";

export class EndpointsBase {
  constructor(protected api: MymoidApi) {}

  /**
   * Performs a GET request on the given path.
   *
   * @param url
   * @returns
   * @throws Will throw an error if the response is not successful.
   *
   * @example
   * const response = await api.makeRequest("GET", "/payment-orders");
   */
  protected async getRequest<TReturnType>(url: string): Promise<TReturnType> {
    return await makeRequest<TReturnType>("GET", url);
  }
}
