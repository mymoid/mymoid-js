import { EventEmitter } from './event-emitter'
import { Events, Options } from './shared/types'

const defaultPaymentOrderId = ''
const defaultPaymentPointId = ''
const defaultInputs = {}
const defaultEmbedId = ''
const defaultSubmitButtonId = ''
const defaultIframe3dsId = ''
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
  private inputs: any
  private embedFormId: string
  private submitButtonId: string
  private iframe3dsId: string
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
    this.inputs = option?.inputs ?? defaultInputs
    this.embedFormId = option?.embedFormId ?? defaultEmbedId
    this.submitButtonId = option?.submitButtonId ?? defaultSubmitButtonId
    this.iframe3dsId = option?.iframe3dsId ?? defaultIframe3dsId
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
        paymentPointId: this.paymentPointId
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

    const submitButton = document.getElementById(
      this.submitButtonId
    ) as HTMLButtonElement

    submitButton.addEventListener('click', () => this.submitPaymentForm())
    this.triggerEvent('loaded')
  }

  /**
   * Check if the form is loaded in the Iframe
   */
  public isFormLoaded() {
    return Boolean(this.iframeElement)
  }

  private triggerEvent<K extends keyof Events>(event: K, payload?: Events[K]) {
    this.emitter.emit(event, payload)
  }

  private handleMessage(event: MessageEvent) {
    // Ensure messages come from the trusted iframe source
    if (!this.iframeBaseUrl.startsWith(event.origin)) return

    type FormDataKeys = keyof FormData

    const { eventType, isValid, data, result } = event.data as {
      field: FormDataKeys
      value: unknown
      eventType: 'validation' | '3ds-process'
      isValid: boolean
      data: any
      result: 'success' | 'error'
    }

    if (eventType === '3ds-process') {
      if (result) {
        const iframe = document.getElementById(this.iframe3dsId) as HTMLElement
        iframe.style.display = 'none'
        if (result === 'success') {
          this.triggerEvent('3ds:status', {
            isCompleted: true,
            error: false,
            data
          })
          const loading = document.getElementById('loading') as HTMLElement
          loading.style.display = 'block'

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
            this.iframe3dsId
          )
        }
        this.triggerEvent('3ds:status', {
          isCompleted: true,
          error: true,
          data
        })
      } else {
        if (data) {
          this.triggerEvent('3ds:status', { start: true, data })
          const iframe = document.getElementById(
            this.iframe3dsId
          ) as HTMLElement
          iframe.style.display = 'block'
          this.createForm(data?.action, this.iframe3dsId)
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

    const iframe = document.getElementById(this.iframe3dsId)

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

  private async submitPaymentForm() {
    this.triggerEvent('submit')
    const inputHolderName = document.getElementById(
      'input-holderName'
    ) as HTMLInputElement

    this.iframeElement?.contentWindow?.postMessage(
      {
        type: 'submit',
        inputs: { holderName: inputHolderName?.value || '' }
      },
      this.iframeBaseUrl
    )
  }
}
