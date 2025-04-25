import { EventEmitter } from './event-emitter'
import { Events, Options } from './shared/types'

const defaultPaymentOrderId = ''
const defaultPaymentPointId = ''
const defaultIs3DSFlow = false
const defaultInputs = {}
const defaultEmbedId = ''
const defaultSubmitButtonId = ''
const defaultIframe3DSId = ''
const defaultIframeBaseUrl = 'http://localhost:3001/embed'
const defaultIframeElement = null
const defaultIsValid = false

/**
 * The client for interacting with the MYMOID EMBED FORM.
 *
 * @class
 * @public
 */
export class MymoidEmbed {
  private paymentOrderId: string
  private paymentPointId: string
  private is3DSFlow: boolean
  private inputs: any
  private embedFormId: string
  private submitButtonId: string
  private iframe3DSId: string
  private isValid: boolean
  private iframeBaseUrl: string
  private iframeElement: HTMLIFrameElement | null

  private emitter = new EventEmitter<Events>()

  on = this.emitter.on.bind(this.emitter)
  off = this.emitter.off.bind(this.emitter)

  /**
   * Creates an instance of the MymoidEmbed.
   * @param {Options} options - The options object containing mandatory data and optional data.
   */
  public constructor(option: Options) {
    this.paymentOrderId = option?.paymentOrderId ?? defaultPaymentOrderId
    this.paymentPointId = option?.paymentPointId ?? defaultPaymentPointId
    this.is3DSFlow = option?.is3DSFlow ?? defaultIs3DSFlow
    this.inputs = option?.inputs ?? defaultInputs
    this.embedFormId = option?.embedFormId ?? defaultEmbedId
    this.submitButtonId = option?.submitButtonId ?? defaultSubmitButtonId
    this.iframe3DSId = option?.iframe3DSId ?? defaultIframe3DSId
    this.iframeBaseUrl = defaultIframeBaseUrl
    this.iframeElement = defaultIframeElement
    this.isValid = defaultIsValid
  }

  /**
   * Initialize the SDK and check that the mandatory data is correct.
   * @throws Will throw an error if the payment order id, payment point id,
   * embed form id or submit button id is not provided or not exist in the html.
   */
  public init() {
    if (!this.paymentOrderId) {
      throw Error('paymentOrderId not found.')
    }
    if (!this.paymentPointId) {
      throw Error('paymentPointId not found.')
    }
    const embedForm = document.getElementById(
      this.embedFormId
    ) as HTMLButtonElement

    if (!embedForm) {
      throw Error(`Container with id ${this.embedFormId} not found.`)
    }
    const submitButton = document.getElementById(
      this.submitButtonId
    ) as HTMLButtonElement

    if (!submitButton) {
      throw Error(`Button with id ${this.submitButtonId} not found.`)
    }
    this.triggerEvent('initialized')
  }

  /**
   * Render the embed form to the DOM.
   */
  public render() {
    const iframe = document.createElement('iframe')
    const optionsBase64 = btoa(
      JSON.stringify({
        inputOptions: this.inputs || {},
        paymentOrderId: this.paymentOrderId,
        paymentPointId: this.paymentPointId,
        is3DSFlow: this.is3DSFlow
      })
    )

    iframe.src = `${this.iframeBaseUrl}${
      optionsBase64 && `?options=${optionsBase64}`
    }`
    iframe.name = this.embedFormId
    iframe.height = '100%'
    iframe.width = '100%'
    iframe.style.border = 'none'

    const container = document.getElementById(this.embedFormId)
    container?.appendChild(iframe)

    this.iframeElement = iframe

    window.addEventListener('message', this.handleMessage.bind(this))
    this.triggerEvent('loaded')
  }

  /**
   * Check if the form is loaded in the Iframe
   */
  public isFormLoaded() {
    return Boolean(this.iframeElement)
  }

  /**
   * Submit to the MYMOID API.
   * @param {holderNameValue} holderNameValue - The holder name input value if you are using ones, default value is a empty string.
   */
  public async submitPaymentForm(holderNameValue?: string) {
    this.triggerEvent('payment', { status: 'begin', is3DS: this.is3DSFlow })

    this.iframeElement?.contentWindow?.postMessage(
      {
        type: 'submit',
        inputs: { holderName: holderNameValue || '' }
      },
      this.iframeBaseUrl
    )
  }

  private triggerEvent<K extends keyof Events>(event: K, payload?: Events[K]) {
    this.emitter.emit(event, payload)
  }

  private handleMessage(event: MessageEvent) {
    // Ensure messages come from the trusted iframe source
    if (!this.iframeBaseUrl.startsWith(event.origin)) return

    const { eventType, isValid, data, result, status } = event.data as {
      eventType: 'validation' | '3ds-process' | 'anonymous'
      isValid: boolean
      data: any
      result: 'success' | 'error'
      status: 'begin' | 'completed'
    }
    if (eventType === 'anonymous') {
      this.triggerEvent('payment', {
        status,
        is3DS: false,
        result,
        data
      })
    }
    if (eventType === '3ds-process') {
      if (result) {
        const iframe = document.getElementById(this.iframe3DSId) as HTMLElement
        iframe.style.display = 'none'
        if (result === 'success') {
          this.triggerEvent('payment', {
            status,
            is3DS: true,
            result,
            data
          })

          this.createForm(
            {
              url: `${this.iframeBaseUrl}/execute`,
              httpMethod: 'GET',
              params: [
                {
                  name: 'paymentOrderId',
                  value: this.paymentOrderId
                },
                {
                  name: 'paymentPointId',
                  value: this.paymentPointId
                },
                {
                  name: 'data',
                  value: btoa(data)
                }
              ]
            },
            this.iframe3DSId
          )
        } else {
          this.triggerEvent('payment', {
            status,
            is3DS: true,
            result: 'error',
            data
          })
        }
      } else {
        if (data) {
          this.triggerEvent('payment', {
            status: 'begin',
            is3DS: true,
            result,
            data
          })
          const iframe = document.getElementById(
            this.iframe3DSId
          ) as HTMLElement
          iframe.style.display = 'block'
          this.createForm(data?.action, this.iframe3DSId)
        }
      }
    }

    if (eventType === 'validation') {
      console.log(data)
      this.triggerEvent('validation', {
        errors: JSON.parse(data || '{}'),
        isValid
      })
      this.isValid = isValid
      this.updateSubmitButtonState()
    }
  }

  private updateSubmitButtonState() {
    const submitButton = document.getElementById(
      this.submitButtonId
    ) as HTMLButtonElement

    if (submitButton) {
      submitButton.disabled = !this.isValid
    }
  }

  private createForm({ url, httpMethod, params = [] }: any, target = '') {
    if (!url || !httpMethod) {
      throw new Error('Invalid form data: URL and HTTP method are required.')
    }

    const form = document.createElement('form')
    form.method = httpMethod
    form.action = url

    const iframe = document.getElementById(this.iframe3DSId)

    if (iframe) {
      iframe.setAttribute('name', target)
      form.target = target
    }

    if (params.length > 0) {
      params.forEach(({ name, value }: any) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      })
    }

    document.body.appendChild(form)
    form.submit()
    form.remove()
  }
}
