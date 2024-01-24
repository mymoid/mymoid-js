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
  paymentOrderId: string
  amount: number
  concept: string
  creationDate: string
  expirationDate: string
  currency: Currency
  reference: string
  shortCode: string
  status: PaymentOrderStatus
}

export type PaymentOrders = List<PaymentOrder>
export interface PaymentOrdersQueryParameters extends Pagination {
  organizationId?: string
  q?: string
  startDate?: string
  endDate?: string
  maxAmount?: number
  minAmount?: number
  status?: PaymentOrderStatus[]
  paymentPoints?: string[]
}

export interface PaymentOrderCreationParameters
  extends Omit<
    PaymentOrder,
    | 'paymentOrderId'
    | 'status'
    | 'creationDate'
    | 'shortCode'
    | 'expirationDate'
  > {
  expirationDate?: string
}
