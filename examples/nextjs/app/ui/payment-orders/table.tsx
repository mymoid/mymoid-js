import Link from 'next/link'
import { type PaymentOrder, Camelize } from '@mymoid/api'
import { formatCurrency } from '@/app/lib/utils'
import PaymentOrderStatus from './status'
import { Button } from '../button'

export default function PaymentOrdersTable({
  paymentOrders
}: {
  paymentOrders?: Camelize<PaymentOrder>[]
}) {
  return (
    <table className="min-w-full">
      <thead className="border-b border-neutral-600">
        <tr>
          {['Amount', 'Status', 'Concept', 'Short Code', 'Date', 'Actions'].map(
            (title) => (
              <th
                key={title}
                scope="col"
                className="px-4 py-3 text-xs font-normal uppercase whitespace-nowrap"
              >
                {title}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="text-neutral-400">
        {paymentOrders?.map((paymentOrder) => (
          <tr
            key={paymentOrder.paymentOrderId}
            className="group/item border-b border-neutral-600 hover:bg-gray-800"
          >
            <td className="whitespace-nowrap px-4 py-3 text-sm">
              <div className="flex gap-2">
                <span className="flex-1 text-right text-white">
                  {formatCurrency(paymentOrder.amount)}
                </span>
                <span className="text-neutral-500">EUR</span>
              </div>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm">
              <PaymentOrderStatus status={paymentOrder.status} />
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm">
              {paymentOrder.concept}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm">
              {paymentOrder.shortCode}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm">
              {new Date(paymentOrder.creationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-sm">
              <div className="flex gap-1 justify-end">
                {(paymentOrder.status === 'PAID' ||
                  paymentOrder.status === 'PARTIALLY_REFUNDED') && (
                  <Link href={`/${paymentOrder.paymentOrderId}/refund`}>
                    <Button className="text-xs inline-lock bg">Refund</Button>
                  </Link>
                )}
                <Link href={`/${paymentOrder.paymentOrderId}`}>
                  <Button className="text-xs inline-lock">View details</Button>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
