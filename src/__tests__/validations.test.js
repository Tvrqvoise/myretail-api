const { validatePrice, validateSku } = require('../validations')
const { ValidationError } = require('../errors')

const testValidatePrice = price => () => validatePrice(price)
const testValidateSku = sku => () => validateSku(sku)

describe('validatePrice', () => {
  it('successfully validates prices', () => {
    expect(testValidatePrice('10.00')).not.toThrow()
    expect(testValidatePrice('2')).not.toThrow()
    expect(testValidatePrice(22.44)).not.toThrow()
    expect(testValidatePrice(22)).not.toThrow()
  })
  it('throws on bad prices', () => {
    expect(testValidatePrice(2.123456)).toThrow(ValidationError)
    expect(testValidatePrice('1.1.1.1')).toThrow(ValidationError)
    expect(testValidatePrice('.5')).toThrow(ValidationError)
    expect(testValidatePrice(null)).toThrow(ValidationError)
    expect(testValidatePrice('one dollar')).toThrow(ValidationError)
  })
})

describe('validateSku', () => {
  it('successfully validates skus', () => {
    expect(testValidateSku('123456')).not.toThrow()
    expect(testValidateSku('123')).not.toThrow()
  })

  it('throws on invalid skus', () => {
    expect(testValidateSku('1.2')).toThrow()
    expect(testValidateSku('1')).toThrow()
    expect(testValidateSku('LG Flat Screen 4k Television')).toThrow()
    expect(testValidateSku()).toThrow()
  })
})
