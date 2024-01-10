import { PaymentOrder } from 'mymoid-api'
import PaymentOrderStatus from './status'
import { formatCurrency } from '@/app/lib/utils'

export default function PaymentOrdersTable({
  paymentOrders
}: {
  paymentOrders?: PaymentOrder[]
}) {
  return (
    <table className="min-w-full">
      <thead className="border-b border-neutral-600">
        <tr>
          {['Amount', 'Status', 'Concept', 'Short Code', 'Date'].map(
            (title) => (
              <th
                scope="col"
                className="px-4 py-3 text-xs font-normal uppercase"
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
            className="border-b border-neutral-600"
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}
