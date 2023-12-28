export type Options = {
  baseUrl?: string;
  apiKey?: string;
  organizationId?: string;
};

export type Currency = "EUR" | "MXN" | "PLN" | "ARS";

export type PaymentOrderStatus =
  | "AVAILABLE"
  | "PARTIALLY_PREAUTH"
  | "PREAUTH"
  | "PREAUTH_REFUNDED"
  | "PREAUTH_EXPIRED"
  | "PAID"
  | "PARTIALLY_REFUNDED"
  | "REFUNDED"
  | "CANCELLED"
  | "EXPIRED";

export interface Pagination {
  limit?: number;
  page?: number;
}

// Query parameters
export interface PaymentOrdersQueryParametersJSON extends Pagination {
  organization_id: string;
  q?: string;
  start_date?: string;
  end_date?: string;
  max_amount?: number;
  min_amount?: number;
  status?: PaymentOrderStatus[];
  payment_points?: string[];
}
export interface PaymentOrdersQueryParameters extends Pagination {
  q?: string;
  startDate?: string;
  endDate?: string;
  maxAmount?: number;
  minAmount?: number;
  status?: PaymentOrderStatus[];
  paymentPoints?: string[];
}

// Response API JSON

export interface ListJSON<TItemType> {
  page: number;
  limit: number;
  total_elements: number;
  number_of_elements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
  content: TItemType[];
}

export interface List<TItemType> {
  limit: number;
  page: number;
  totalElements: number;
  numberOfElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
  content: TItemType[];
}

export interface PaymentOrderJSON {
  payment_order_id: string;
  amount: number;
  concept: string;
  creation_date: string;
  currency: Currency;
  reference: string;
  short_code: string;
  status: PaymentOrderStatus;
}

export interface PaymentOrder {
  paymentOrderId: string;
  amount: number;
  concept: string;
  creationDate: Date;
  currency: Currency;
  reference: string;
  shortCode: string;
  status: PaymentOrderStatus;
}
