import PaymentOrdersTable from '@/app/ui/payment-orders/table'
import Pagination from '@/app/ui/payment-orders/pagination'
import Search from '@/app/ui/search'
import CreateButton from '@/app/ui/payment-orders/buttons'
import { mymoid } from '@/app/lib/mymoid-api'
import MainHeader from './ui/main-header'

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

  const paymentOrdersPage = await mymoid.paymentOrders.get({
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
    <>
      <MainHeader
        title="Payment Orders"
        subtitle=" Explore and manage your payment orders with ease"
      >
        <Search placeholder="Search payment orders..." className="w-[280px]" />
        <CreateButton />
      </MainHeader>
      <PaymentOrdersTable paymentOrders={paymentOrders} />
      <div className="sticky bottom-0 flex justify-between items-center py-3 text-right w-full bg-[rgb(var(--background-rgb))]">
        <p className="px-2 text-xs text-neutral-500">
          {numberOfElements} of {totalElements} results
        </p>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
