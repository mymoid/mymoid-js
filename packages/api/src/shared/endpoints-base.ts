import { MymoidApi } from '../api'
import { makeRequest } from './utils'

export class EndpointsBase {
  constructor(protected api: MymoidApi) {}

  protected async getRequest<TReturnType>(url: string): Promise<TReturnType> {
    return await makeRequest<TReturnType>(this.api, 'GET', url)
  }
}
