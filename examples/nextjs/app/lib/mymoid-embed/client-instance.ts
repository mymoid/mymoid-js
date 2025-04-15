import { MymoidEmbed } from '@mymoid/embed'

function clientInstance() {
  return new MymoidEmbed({
    paymentOrderId:
      '06a4e8383438a109b711f07e26fcf504c3c4d853fbbacacc3a1b2230273c875e',
    paymentPointId:
      'f7b9e5dc2779edb290381ef583666dc6f71141cb517aedd5d7feb367bf435dad',
    embedFormId: 'embed-form',
    submitButtonId: 'submit-button',
    iframe3dsId: 'iframe-3ds',
    inputs: {
      /* style: { borderColor: 'red', borderRadius: '50%', borderWidth: '10px' } */
    }
  })
}

export default clientInstance()
