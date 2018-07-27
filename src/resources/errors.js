const { BaseError } = require('make-error')

class DetailsNotFoundError extends BaseError {}

class PriceNotFoundError extends BaseError {}

class ServiceError extends BaseError {}

exports = module.exports = { DetailsNotFoundError, PriceNotFoundError, ServiceError }
