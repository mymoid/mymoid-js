import { MymoidApi } from '../api'
import { ApiError } from '../errors/api-error'
import { MymoidApiError } from './types'

export async function makeRequest<TReturnType>(
  api: MymoidApi,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body: any = undefined,
  contentType: string | undefined = undefined
): Promise<TReturnType> {
  const apiKey = api.getApiKey()
  const baseUrl = api.getBaseUrl()
  const fullUrl = baseUrl + url
  const organizationId = api.getOrganizationId()
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
    return await response.json()
  } catch (error) {
    // TODO: Add logic to this catch clause or eliminate it and rethrow the exception automatically. [sonarlint(typescript:S2737)]
    throw error
  }
}

async function handleError(error: MymoidApiError): Promise<MymoidApiError> {
  throw new ApiError({
    code: error.code,
    message: error.message,
    status: error.status,
    origin: error.origin,
    details: error.details.map((detail: { message: string }) => {
      return { message: detail.message }
    })
  })
}

export function createUrlParamsString(args: any): string {
  const params = new URLSearchParams()
  for (let key of Object.getOwnPropertyNames(args)) {
    if (
      args[key] ||
      args[key] === 0 ||
      (!args[key] && typeof args[key] === 'boolean')
    ) {
      params.append(key, args[key].toString())
    }
  }
  return [...params].length > 0 ? `?${params.toString()}` : ''
}
