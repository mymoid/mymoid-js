import { ApiError } from '../errors/api-error'
import { MymoidApiError } from './types'

export async function handleError(
  error: MymoidApiError
): Promise<MymoidApiError> {
  console.log(error)
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

function snakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
}

function camelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_match, group) => group.toUpperCase())
}

export function mapKeysTo<T extends Record<string, any>>(
  transformKey: (key: string) => string,
  data: Record<string, any>
): T {
  const transformValue = (value: any): any => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return value.map((item) => transformValue(item))
      } else {
        return mapKeysTo<T>(transformKey, value as Record<string, any>)
      }
    } else {
      return value
    }
  }

  const newObj = {} as T

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const transformedKey = transformKey(key)
      newObj[transformedKey as keyof T] = transformValue(
        data[key]
      ) as T[keyof T]
    }
  }

  return newObj
}

export function camelize<T extends {}>(data: Record<string, any>) {
  return mapKeysTo<T>(camelCase, data)
}

export function decamelize<T extends {}>(data: Record<string, any>) {
  return mapKeysTo<T>(snakeCase, data)
}
