const express = require('express')
const fetch = require('node-fetch')
const morgan = require('morgan')

// Rules here are arbitrary -- hopefully I'd know the real ones if this app was real
const isValidSku = sku => /^\d{3,10}$/.test(sku)

exports = module.exports = express()
  .use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))
  .get('/products/v1/:sku', async (req, res) => {
    const { sku } = req.params
    if (!isValidSku(sku)) {
      return res.status(422).json({ error: `${JSON.stringify(sku)} is not a valid SKU` })
    }
    const response = await fetch(`http://redsky.target.com/v2/pdp/tcin/${sku}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
    const json = await response.json()
    return res.json(json)
  })
  .use('*', (req, res) => res.status(404).json({ error: 'Route not configured' }))
