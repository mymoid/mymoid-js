import { MymoidEmbed } from '@mymoid/embed'

function clientInstance() {
  return new MymoidEmbed({
    paymentOrderId: '459',
    paymentPointId: 'dasfds',
    embedFormId: 'embed-form',
    submitButtonId: 'submit-button',
    iframe3dsId: 'iframe-3ds',
    successUrl: 'https://www.mymoid.com/',
    errorUrl: 'https://www.mymoid.com/'
  })
}

export default clientInstance()
