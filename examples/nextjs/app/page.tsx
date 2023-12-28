import { MymoidApi } from 'mymoid-api'

export default async function Page() {
  const api = new MymoidApi()
  async function PaymentOrders() {
    try {
      const paymentOrderPage = await api.paymentOrders.getPage({
        page: 0,
        limit: 10
      })
      return <div>Payment Order: {paymentOrderPage.totalElements}</div>
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <PaymentOrders />
    </div>
  )
}
