const fetch = require('node-fetch')
const { getProductDetails } = require('../product-details-resource')
const { DetailsNotFoundError, ServiceError } = require('../../errors')
const MOCK_RED_SKY_RESPONSE = require('./data/mock-red-sky-response')

jest.mock('node-fetch')

const mockResponse = (status, response) => fetch.mockImplementationOnce(() => Promise.resolve({
  status,
  ok: status >= 200 && status < 300,
  json: () => Promise.resolve(response)
}))

describe('getProductDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('calls and responds with data', async () => {
    mockResponse(200, MOCK_RED_SKY_RESPONSE)
    expect(await getProductDetails('1234567')).toEqual(MOCK_RED_SKY_RESPONSE)
    expect(fetch).toHaveBeenCalledWith('http://redsky.target.com/v2/pdp/tcin/1234567?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics')
  })

  it('throws DetailsNotFoundError when we get back a 404 from the service', async () => {
    mockResponse(404)
    expect(getProductDetails('1234567')).rejects.toThrow(DetailsNotFoundError)
  })

  it('throws a ServiceError when we get other non-200 status codes', async () => {
    mockResponse(500)
    expect(getProductDetails('1234567')).rejects.toThrow(ServiceError)
  })

  it('passes up other errors from fetch', () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Whoops!')))
    expect(getProductDetails('1234567')).rejects.toThrow(Error)
  })
})
