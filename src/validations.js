const { ValidationError } = require('./errors')

const makeValidationFromRegex = (rx, field) => input => {
  if (!rx.test(input || '')) { throw new ValidationError(field, input) }
}

// Rules here are arbitrary -- hopefully I'd know the real ones if this app was real
const validateSku = makeValidationFromRegex(/^\d{3,10}$/, 'sku')
const validatePrice = makeValidationFromRegex(/^\d+(\.\d{2})?$/, 'price')

exports = module.exports = { validateSku, validatePrice }
