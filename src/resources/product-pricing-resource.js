const mongoose = require('mongoose')
const { PriceNotFoundError } = require('./errors')

const priceSchema = new mongoose.Schema({
  sku: Number,
  currentPrice: Number
})

const Price = mongoose.model('Price', priceSchema)

const getProductPrice = async sku => {
  const price = await Price.findOne({ sku }).exec()
  if (!price) throw new PriceNotFoundError(sku)
  return { price }
}

exports = module.exports = { getProductPrice }
