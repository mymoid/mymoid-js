import { mymoid } from '@/app/lib/mymoid-api'
import { formatCurrency } from '@/app/lib/utils'
import { Field } from '../field'

export default async function PaymentOrderDetail({ id }: { id: string }) {
  const paymentOrder = await mymoid.paymentOrders.getById(id)
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4 basis-1/2">
        <Field
          title="Creation date"
          value={new Date(paymentOrder.creationDate).toUTCString()}
        />
        <Field title="Currency" value={paymentOrder.currency} />
        <Field title="Amount" value={formatCurrency(paymentOrder.amount)} />
        <Field title="Status" value={paymentOrder.status} />
      </div>
      <div className="flex flex-col gap-4 basis-1/2">
        <Field title="Short code" value={paymentOrder.shortCode} />
        <Field title="Concept" value={paymentOrder.concept} />
        <Field title="Reference" value={paymentOrder.reference} />
        <Field
          title="Expiration date"
          value={new Date(paymentOrder.expirationDate).toUTCString()}
        />
      </div>
    </div>
  )
}
