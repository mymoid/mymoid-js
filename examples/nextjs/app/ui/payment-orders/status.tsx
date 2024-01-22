import { PaymentOrderStatus as Status } from '@mymoid/api'

export default function PaymentOrderStatus({ status }: { status: Status }) {
  const generateClassString = (status: Status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-sky-900 text-sky-200'
      case 'PAID':
        return 'bg-green-700 text-green-50'
      case 'EXPIRED':
        return 'bg-neutral-800 text-neutral-400'
      case 'PARTIALLY_REFUNDED':
        return 'bg-yellow-800 text-yellow-200'

      default:
        return ''
    }
  }

  return (
    <span
      className={[
        'inline-flex items-center rounded px-1.5 py-0.5 text-xs lowercase first-letter:uppercase',
        generateClassString(status)
      ].join(' ')}
    >
      {status}
    </span>
  )
}
