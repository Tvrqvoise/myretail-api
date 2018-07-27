const morgan = require('morgan')
const express = require('express')
const { getProductPrice } = require('./resources/product-pricing-resource')
const { getProductDetails } = require('./resources/product-details-resource')
const { PriceNotFoundError, DetailsNotFoundError } = require('./resources/errors')

// Rules here are arbitrary -- hopefully I'd know the real ones if this app was real
const isValidSku = sku => /^\d{3,10}$/.test(sku)

exports = module.exports = express()
  .use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))
  .get('/products/v1/:sku', async (req, res) => {
    const { sku } = req.params
    if (!isValidSku(sku)) {
      return res.status(422).json({ error: `${JSON.stringify(sku)} is not a valid SKU` })
    }

    try {
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
    } catch (ex) {
      if ((ex instanceof PriceNotFoundError) || (ex instanceof DetailsNotFoundError)) {
        res.status(404).json({ error: ex.message })
      } else {
        res.status(500).json({ error: ex.message })
      }
    }
  })
  .use('*', (req, res) => res.status(404).json({ error: 'Route not configured' }))
