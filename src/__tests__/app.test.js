const supertest = require('supertest')
const { getProductDetails } = require('../resources/product-details-resource')
const { getProductPrice, setProductPrice } = require('../resources/product-pricing-resource')
const app = require('../app')
const { DetailsNotFoundError, PriceNotFoundError } = require('../errors')
const MOCK_RED_SKY_RESPONSE = require('./data/mock-red-sky-response.json')

jest.mock('../resources/product-details-resource')
jest.mock('../resources/product-pricing-resource')

describe('GET /products/v1/:sku', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    getProductDetails.mockImplementation(() => Promise.resolve(MOCK_RED_SKY_RESPONSE))
    getProductPrice.mockImplementation(() => Promise.resolve({ currentPrice: '20.00' }))
  })

  it('handles 200 responses', () => {
    return supertest(app)
      .get('/products/v1/13860428')
      .set('Accept', 'application/json')
      .expect(200, { ...MOCK_RED_SKY_RESPONSE, price: { currentPrice: '20.00' } })
  })

  it('validates the sku id', async () => {
    await supertest(app)
      .get('/products/v1/hamburger')
      .set('Accept', 'application/json')
      .expect(422, { error: '"hamburger" is not a valid sku' })

    expect(getProductDetails).not.toHaveBeenCalled()
    expect(getProductPrice).not.toHaveBeenCalled()
  })

  it('supports the "not found" errors', async () => {
    getProductDetails.mockImplementationOnce(async () => { throw new DetailsNotFoundError('13860428') })

    await supertest(app)
      .get('/products/v1/13860428')
      .set('Accept', 'application/json')
      .expect(404, { error: 'No product details found for sku: "13860428"' })

    getProductPrice.mockImplementationOnce(() => Promise.reject(new PriceNotFoundError('13860428')))

    await supertest(app)
      .get('/products/v1/13860428')
      .set('Accept', 'application/json')
      .expect(404, { error: 'No product pricing found for sku: "13860428"' })
  })

  it('handles arbitrary errors', async () => {
    getProductDetails.mockImplementationOnce(async () => { throw new Error('Something went wrong!!') })

    await supertest(app)
      .get('/products/v1/13860428')
      .set('Accept', 'application/json')
      .expect(500, { error: 'Something went wrong!!' })
  })
})

describe('404', () => {
  it('handles bad request routes', async () => {
    await supertest(app)
      .get('/foo/arawe/fefefe')
      .set('Accept', 'application/json')
      .expect(404, { error: 'Route not configured' })
  })
})

describe('PUT /products/v1/:sku/price', () => {
  it('handles the happy case', async () => {
    await supertest(app)
      .put('/products/v1/13860428/price')
      .send({ currentPrice: '20.00' })
      .set('Content-Type', 'application/json')
      .expect(201)

    expect(setProductPrice).toHaveBeenCalledWith('13860428', '20.00')
  })

  it('validates the input', async () => {
    await supertest(app)
      .put('/products/v1/13860428/price')
      .send({ currentPrice: null })
      .set('Content-Type', 'application/json')
      .expect(422, {'error': 'null is not a valid price'})

    await supertest(app)
      .put('/products/v1/hamburger/price')
      .send({ currentPrice: '20.00' })
      .set('Content-Type', 'application/json')
      .expect(422, {'error': '"hamburger" is not a valid sku'})
  })
})
