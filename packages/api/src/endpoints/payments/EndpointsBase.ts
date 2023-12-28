import { MymoidApi } from "../../MymoidApi";

export class EndpointsBase {
  private static paymentsApi: string = "/payments/v1";

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
    return await this.api.makeRequest<TReturnType>(
      "GET",
      EndpointsBase.paymentsApi + url
    );
  }
  
  protected paramsFor(args: any): string {
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
}
