const mongoose = require('mongoose')

const priceSchema = new mongoose.Schema({
  sku: Number,
  currentPrice: Number
})

const Price = mongoose.model('Price', priceSchema)

const getProductPrice = async sku => {
  const price = await Price.find({ sku }).exec()
  return { price }
}

exports = module.exports = { getProductPrice }
