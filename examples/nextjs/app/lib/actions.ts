'use server'

import { PaymentOrderCreationParameters } from '@mymoid/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mymoid } from './mymoid-api'
import { toCents } from './utils'

export async function createPaymentOrder(formData: FormData) {
  // Validate form fields
  // ...

  const rawFormData = {
    reference: formData.get('reference'),
    concept: formData.get('concept'),
    amount: Number(formData.get('amount')) * 100,
    currency: formData.get('currency')
    // expirationDate: formData.get('expiration_date')
  } as PaymentOrderCreationParameters

  console.log(rawFormData)

  await mymoid.paymentOrders.create(rawFormData)

  revalidatePath('/')
  redirect('/')
}

export async function refundPaymentOrder(formData: FormData) {
  // Validate form fields
  // ...

  const id = formData.get('id') as string
  const amount = toCents(formData.get('amount') as string)
  await mymoid.paymentOrders.refund(id, amount)

  revalidatePath(`/${id}`)
  redirect(`/${id}`)
}
