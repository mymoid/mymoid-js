import { Currency, List, Pagination } from '../shared/types'

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

export interface PaymentOrder {
  payment_order_id: string
  amount: number
  concept: string
  creation_date: string
  expiration_date: string
  currency: Currency
  reference: string
  short_code: string
  status: PaymentOrderStatus
}

export type PaymentOrders = List<PaymentOrder>
export interface PaymentOrdersQueryParameters extends Pagination {
  organization_id?: string
  q?: string
  start_date?: string
  end_date?: string
  max_amount?: number
  min_amount?: number
  status?: PaymentOrderStatus[]
  payment_points?: string[]
}

export interface PaymentOrderCreationParameters
  extends Omit<
    PaymentOrder,
    | 'payment_order_id'
    | 'status'
    | 'creation_date'
    | 'short_code'
    | 'expiration_date'
  > {
  expiration_date?: string
}
