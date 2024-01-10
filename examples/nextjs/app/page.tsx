import { MymoidApi } from 'mymoid-api'
import PaymentOrdersTable from '@/app/ui/payment-orders/table'
import Pagination from '@/app/ui/payment-orders/pagination'
import Search from '@/app/ui/search'

const ITEMS_PER_PAGE = 12

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const api = new MymoidApi()

  const paymentOrdersPage = await api.paymentOrders.get({
    limit: ITEMS_PER_PAGE,
    page: currentPage - 1,
    q: query
  })

  const {
    content: paymentOrders,
    totalElements,
    numberOfElements
  } = paymentOrdersPage
  const totalPages = Math.floor(totalElements / ITEMS_PER_PAGE)

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="font-semibold text-3xl">Payment Orders</h2>
          <h4 className="text-neutral-500">
            Explore and manage your payment orders with ease
          </h4>
        </div>
        <div className="flex gap-2">
          <Search
            placeholder="Search payment orders..."
            className="w-[280px]"
          />
        </div>
      </div>
      <PaymentOrdersTable paymentOrders={paymentOrders} />
      <div className="sticky bottom-0 flex justify-between items-center px-2 py-3 text-right w-full bg-[rgb(var(--background-rgb))]">
        <p className="text-xs text-neutral-500">
          {numberOfElements} of {totalElements} results
        </p>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
