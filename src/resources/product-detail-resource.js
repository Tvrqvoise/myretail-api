const fetch = require('node-fetch')

const getProductDetails = async sku => {
  const response = await fetch(`http://redsky.target.com/v2/pdp/tcin/${sku}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
  return response.json()
}

exports = module.exports = { getProductDetails }
