const morgan = require('morgan')
const express = require('express')
const { getProductPrice, setProductPrice } = require('./resources/product-pricing-resource')
const { getProductDetails } = require('./resources/product-details-resource')
const { validatePrice, validateSku } = require('./validations')

const autoCatch = func => async (req, res, next) => {
  try {
    await func(req, res, next)
  } catch (ex) {
    return next(ex)
  }
}

exports = module.exports = express()
  .use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))
  .use(express.json())
  .get('/products/v1/:sku', autoCatch(async (req, res, next) => {
    const { sku } = req.params

    validateSku(sku)

    const [
      details,
      price
    ] = await Promise.all([
      getProductDetails(sku),
      getProductPrice(sku)
    ])

    res.json({
      ...details,
      price
    })
  }))
  .put('/products/v1/:sku/price/', autoCatch(async (req, res, next) => {
    const { sku } = req.params
    const { currentPrice } = req.body

    validateSku(sku)
    validatePrice(currentPrice)

    await setProductPrice(sku, currentPrice)
    res.status(201).end()
  }))
  .use('*', (req, res) => res.status(404).json({ error: 'Route not configured' }))
  .use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({ error: err.message })
    next(err)
  })
