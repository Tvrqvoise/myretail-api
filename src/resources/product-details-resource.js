const fetch = require('node-fetch')
const { DetailsNotFoundError, ServiceError } = require('./errors')

const getProductDetails = async sku => {
  const response = await fetch(`http://redsky.target.com/v2/pdp/tcin/${sku}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
  if (!response.ok) {
    if (response.status === 404) throw new DetailsNotFoundError(sku, response)
    throw new ServiceError(sku, response)
  }
  return response.json()
}

exports = module.exports = { getProductDetails }
