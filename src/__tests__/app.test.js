const supertest = require('supertest')
const fetch = require('node-fetch')
const app = require('../app')
const MOCK_RED_SKY_RESPONSE = require('./data/mock-red-sky-response.json')

jest.mock('node-fetch')

describe('request handler', () => {
  it('handles 200 responses', () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(MOCK_RED_SKY_RESPONSE) }))

    return supertest(app)
      .get('/products/v1/13860428')
      .set('Accept', 'application/json')
      .expect(200, MOCK_RED_SKY_RESPONSE)
  })
})
