import { mymoid } from '@/app/lib/mymoid-api'
import { Button } from '@/app/ui/button'
import { refundPaymentOrder } from '@/app/lib/actions'
import MainHeader from '@/app/ui/main-header'
import TextFiled from '@/app/ui/text-field'

export default async function Page({ params }: { params: { slug: string } }) {
  const paymentOrderId = params.slug
  const paymentOrder = await mymoid.paymentOrders.getById(paymentOrderId)
  return (
    <>
      <MainHeader
        title={`Refund Payment Order`}
        subtitle={`ID: ${paymentOrderId}`}
      />
      <form action={refundPaymentOrder}>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <input name="id" type="hidden" value={paymentOrderId} />
          <TextFiled
            name="amount"
            label="Amount"
            defaultValue={paymentOrder.amount / 100}
            type='number'
          />
        </div>
        <Button variant="primary" type="submit">
          Refund Payment Order
        </Button>
      </form>
    </>
  )
}
