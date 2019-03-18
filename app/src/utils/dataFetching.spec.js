import { handleFetchErrors } from './dataFetching'

describe('data fetching', () => {
  it('handleFetchErrors handle errors properly', () => {
    const validResponse = { ok: true, status: 'ok' }
    const invalidResponse = { ok: false, status: 'error' }

    const isOk = handleFetchErrors(validResponse)
    expect(isOk).toEqual(validResponse)

    const hasError = () => handleFetchErrors(invalidResponse)
    expect(hasError).toThrowError()
  })
})
