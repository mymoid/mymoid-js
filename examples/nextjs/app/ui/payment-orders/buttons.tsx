import Link from 'next/link'
import { Button } from '@/app/ui/button'

export default function CreatePaymentOrderButton() {
  return (
    <Link href="/create">
      <Button variant="primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create
      </Button>
    </Link>
  )
}
