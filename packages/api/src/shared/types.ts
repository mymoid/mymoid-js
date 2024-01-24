type CamelCase<S extends string> =
  S extends `${infer FirstWord}_${infer SecondChar}${infer Remaining}`
    ? `${Lowercase<FirstWord>}${Uppercase<SecondChar>}${CamelCase<Remaining>}`
    : Lowercase<S>

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : Lowercase<S>

export type Camelize<T> = {
  [key in keyof T as CamelCase<string & key>]: T[key] extends Array<
    infer ArrayItem
  >
    ? ArrayItem extends T[keyof T]
      ? Camelize<ArrayItem>[]
      : T[key]
    : T[key]
}

export type Decamelize<T> = {
  [key in keyof T as SnakeCase<string & key>]: T[key] extends Array<
    infer ArrayItem
  >
    ? ArrayItem extends T[keyof T]
      ? Decamelize<ArrayItem>[]
      : T[key]
    : T[key]
}

export type Options = {
  baseUrl?: string
  apiKey?: string
  organizationId?: string
}

export type Currency = 'EUR' | 'MXN' | 'PLN' | 'ARS'

export interface Pagination {
  limit?: number
  page?: number
}

export interface List<TItemType> extends Record<string, unknown> {
  page: number
  limit: number
  totalElements: number
  numberOfElements: number
  last: boolean
  first: boolean
  empty: boolean
  content: TItemType[]
}

export interface MymoidApiError {
  code: string
  message: string
  status: number
  origin: string
  details: { message: string }[]
}
