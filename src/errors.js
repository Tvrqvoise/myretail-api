const { BaseError } = require('make-error')

class DetailsNotFoundError extends BaseError {
  constructor (sku) {
    super(`No product details found for sku: ${JSON.stringify(sku)}`)
    this.statusCode = 404
  }
}

class PriceNotFoundError extends BaseError {
  constructor (sku) {
    super(`No product pricing found for sku: ${JSON.stringify(sku)}`)
    this.statusCode = 404
  }
}

class ServiceError extends BaseError {
  constructor (response) {
    super(`Request to ${JSON.stringify(response.url)} responded with status code ${JSON.stringify(response.status)}`)
    this.statusCode = 500
  }
}

class ValidationError extends BaseError {
  constructor (...args) {
    super(...args)
    this.statusCode = 422
  }
}

exports = module.exports = { DetailsNotFoundError, PriceNotFoundError, ServiceError, ValidationError }
