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

export interface ListJSON<TItemType> {
  page: number
  limit: number
  total_elements: number
  number_of_elements: number
  last: boolean
  first: boolean
  empty: boolean
  content: TItemType[]
}

export interface List<TItemType> {
  limit: number
  page: number
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
