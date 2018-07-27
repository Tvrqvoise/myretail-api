const { BaseError } = require('make-error')

class DetailsNotFoundError extends BaseError {
  constructor (sku) {
    super(`No product details found for sku: ${JSON.stringify(sku)}`)
  }
}

class PriceNotFoundError extends BaseError {
  constructor (sku) {
    super(`No product pricing found for sku: ${JSON.stringify(sku)}`)
  }
}

class ServiceError extends BaseError {
  constructor (response) {
    super(`Request to ${JSON.stringify(response.url)} responded with status code ${JSON.stringify(response.status)}`)
  }
}

exports = module.exports = { DetailsNotFoundError, PriceNotFoundError, ServiceError }
