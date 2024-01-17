import { createPaymentOrder } from '@/app/lib/actions'
import { Button } from '../button'
import TextFiled from '../text-field'
import { generateFakePaymentOrderData } from '@/app/lib/utils'

export default async function Form() {
  const data = await generateFakePaymentOrderData()
  return (
    <form action={createPaymentOrder}>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <TextFiled
          name="reference"
          label="Reference"
          defaultValue={data.reference}
          disabled
        />
        <TextFiled
          name="concept"
          label="Concept"
          value={data.concept}
          disabled
        />
        <TextFiled name="amount" label="Amount" value={data.amount} disabled />
        <TextFiled name="currency" label="Currency" value="EUR" disabled />
        <TextFiled
          name="expiration_date"
          label="Expiration Date"
          value="2023-12-19T23:59:59Z"
          disabled
        />
      </div>
      <Button variant="primary" type="submit">
        Create payment order
      </Button>
    </form>
  )
}
