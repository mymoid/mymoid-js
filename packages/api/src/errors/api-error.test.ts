import { describe, expect, it } from 'vitest'
import { ApiError } from './api-error'
import { buildValidApiError } from './test/data/valida-api-error'

describe('ApiError', () => {
  it('should return an message when response is not ok', async () => {
    await expect(async () => {
      const apiError = buildValidApiError()
      throw new ApiError(apiError)
    }).rejects.toThrowError('Bad Request')
  })
  it('should match the error object with the valid api error response', () => {
    const apiError = buildValidApiError()
    const error = new ApiError(apiError)
    expect(JSON.stringify(error)).toMatchInlineSnapshot(
      `"{"message":"Bad Request","code":"400","status":400,"origin":"API","details":[{"message":"Invalid request"}]}"`
    )
  })
})
