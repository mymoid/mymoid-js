import { MymoidApi } from '@mymoid/api'

export default async function Page() {
  const api = new MymoidApi()
  const paymentOrderPage = await api.paymentOrders
    .get({
      page: 0,
      limit: 5,
      status: ['PAID']
    })
    .catch((err) => {
      console.log(err)
      return null
    })

  return (
    <div>
      Payment Order:{' '}
      {paymentOrderPage?.content.map((paymentOrder) => {
        return (
          <div key={paymentOrder.paymentOrderId}>
            {paymentOrder.paymentOrderId} || {paymentOrder.amount} ||{' '}
            {paymentOrder.status} || {paymentOrder.concept}
          </div>
        )
      })}{' '}
    </div>
  )
}
