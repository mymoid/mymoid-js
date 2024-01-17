import { describe, expect, it } from 'vitest'
import { MymoidApi } from './api'

describe('MymoidApi', () => {
  it('Should setting using Options', () => {
    const mymoidApi = new MymoidApi({
      apiKey: 'KEY_1234567890',
      organizationId: 'ORG_1234567890',
      baseUrl: 'https://apis.test.mymoid.com'
    })
    const apikey = mymoidApi.getApiKey()
    const organizationId = mymoidApi.getOrganizationId()
    const baseUrl = mymoidApi.getBaseUrl()

    expect(mymoidApi).toBeInstanceOf(MymoidApi)
    expect(apikey).toEqual('KEY_1234567890')
    expect(organizationId).toEqual('ORG_1234567890')
    expect(baseUrl).toEqual('https://apis.test.mymoid.com')
  })
})
