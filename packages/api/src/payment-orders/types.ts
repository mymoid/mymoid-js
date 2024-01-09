import { Currency, Pagination } from '../shared/types'

export type PaymentOrderStatus =
  | 'AVAILABLE'
  | 'PARTIALLY_PREAUTH'
  | 'PREAUTH'
  | 'PREAUTH_REFUNDED'
  | 'PREAUTH_EXPIRED'
  | 'PAID'
  | 'PARTIALLY_REFUNDED'
  | 'REFUNDED'
  | 'CANCELLED'
  | 'EXPIRED'

export interface PaymentOrdersQueryParametersJSON extends Pagination {
  organization_id: string
  q?: string
  start_date?: string
  end_date?: string
  max_amount?: number
  min_amount?: number
  status?: PaymentOrderStatus[]
  payment_points?: string[]
}
export interface PaymentOrdersQueryParameters extends Pagination {
  q?: string
  startDate?: string
  endDate?: string
  maxAmount?: number
  minAmount?: number
  status?: PaymentOrderStatus[]
  paymentPoints?: string[]
}

export interface PaymentOrderJSON {
  payment_order_id: string
  amount: number
  concept: string
  creation_date: string
  currency: Currency
  reference: string
  short_code: string
  status: PaymentOrderStatus
}

export interface PaymentOrder {
  paymentOrderId: string
  amount: number
  concept: string
  creationDate: string
  currency: Currency
  reference: string
  shortCode: string
  status: PaymentOrderStatus
}
