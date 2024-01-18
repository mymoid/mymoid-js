import { type PaymentOrder, Camelize } from '@mymoid/api'
import PaymentOrderStatus from './status'
import { formatCurrency } from '@/app/lib/utils'
import Link from 'next/link'

export default function PaymentOrdersTable({
  paymentOrders
}: {
  paymentOrders?: Camelize<PaymentOrder>[]
}) {
  return (
    <table className="min-w-full">
      <thead className="border-b border-neutral-600">
        <tr>
          {['Amount', 'Status', 'Concept', 'Short Code', 'Date'].map(
            (title) => (
              <th
                key={title}
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
            <td className="group/edit invisible whitespace-nowrap px-4 py-3 text-sm group-hover/item:visible">
              <Link href={`/${paymentOrder.paymentOrderId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
