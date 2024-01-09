import { ApiError } from '../errors/api-error'
import { MymoidApiError } from './types'

export async function handleError(
  error: MymoidApiError
): Promise<MymoidApiError> {
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
