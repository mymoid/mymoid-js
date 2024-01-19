'use server'

import { PaymentOrderCreationParameters } from '@mymoid/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mymoid } from './mymoid-api'

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
