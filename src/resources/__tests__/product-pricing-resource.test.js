const mockingoose = require('mockingoose').default
const { getProductPrice } = require('../product-pricing-resource')
const { PriceNotFoundError } = require('../../errors')

beforeEach(() => {
  mockingoose.resetAll()
})

describe('getProductPrice', () => {
  it('returns a product price from the data store', async () => {
    mockingoose.Price.toReturn({
      sku: '1234567',
      currentPrice: '20.00'
    }, 'findOne')
    expect(await getProductPrice('1234567')).toEqual({ currentPrice: '20.00' })
  })

  it('throws a PriceNotFoundError if no product price exists', async () => {
    expect(getProductPrice('1234567')).rejects.toThrow(PriceNotFoundError)
  })
})
