'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '../button'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="inline-flex gap-2">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage - 1 >= totalPages}
      />
    </div>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  const label = direction === 'left' ? 'Previous' : 'Next'

  return isDisabled ? (
    <Button className="opacity-40 pointer-events-none">{label}</Button>
  ) : (
    <Link href={href}>
      <Button>{label}</Button>
    </Link>
  )
}
