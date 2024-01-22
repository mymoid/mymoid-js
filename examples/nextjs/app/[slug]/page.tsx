import MainHeader from '../ui/main-header'
import PaymentOrderDetail from '../ui/payment-orders/detail'

export default async function Page({ params }: { params: { slug: string } }) {
  const paymentOrderId = params.slug
  return (
    <>
      <MainHeader title={`Payment Order`} subtitle={`ID: ${paymentOrderId}`} />
      <PaymentOrderDetail id={paymentOrderId} />
    </>
  )
}
