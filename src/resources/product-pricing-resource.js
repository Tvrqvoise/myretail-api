const mongoose = require('mongoose')
const { PriceNotFoundError } = require('../errors')

const priceSchema = new mongoose.Schema({
  sku: String,
  currentPrice: String
})

const Price = mongoose.model('Price', priceSchema)

const findPriceBySku = sku => Price.findOne({ sku }).exec()

const getProductPrice = async sku => {
  const response = await findPriceBySku(sku)
  if (!response) throw new PriceNotFoundError(sku)
  return {
    currentPrice: response.currentPrice
  }
}

const setProductPrice = async (sku, currentPrice) => {
  const price = (await findPriceBySku(sku)) || new Price({ sku })
  price.set({ currentPrice })
  return price.save()
}

exports = module.exports = { getProductPrice, setProductPrice }
