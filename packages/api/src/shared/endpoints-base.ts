import { MymoidApi } from '../api'
import { handleError } from './utils'

export class EndpointsBase {
  constructor(protected api: MymoidApi) {}

  private async makeRequest<TReturnType>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body: any = undefined,
    contentType: string | undefined = undefined
  ): Promise<TReturnType> {
    const apiKey = this.api.getApiKey()
    const baseUrl = this.api.getBaseUrl()
    const fullUrl = baseUrl + url
    const organizationId = this.api.getOrganizationId()
    const headers = {
      'x-organization-id': organizationId,
      'x-api-key': apiKey,
      'Content-Type': contentType ?? 'application/json'
    }

    try {
      const opts: RequestInit = {
        method,
        headers,
        body: body
          ? typeof body === 'string'
            ? body
            : JSON.stringify(body)
          : undefined
      }
      const response = await fetch(fullUrl, opts)
      if (!response.ok) {
        const errorResponse = await response.json()
        await handleError(errorResponse)
      }
      if (response.status === 204) {
        return null as TReturnType
      }
      return response.json()
    } catch (error) {
      // TODO: Add logic to this catch clause or eliminate it and rethrow the exception automatically. [sonarlint(typescript:S2737)]
      throw error
    }
  }

  protected async getRequest<TReturnType>(url: string): Promise<TReturnType> {
    return await this.makeRequest<TReturnType>('GET', url)
  }

  protected async postRequest<TReturnType, TBody>(
    url: string,
    body?: TBody
  ): Promise<TReturnType> {
    return await this.makeRequest<TReturnType>('POST', url, body)
  }
}
