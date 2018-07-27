const mongoose = require('mongoose')
const { user, pass } = require('../auth.json')

exports = module.exports = () => {
  mongoose.connect(`mongodb://${user}:${pass}@ds131312.mlab.com:31312/myretail-api`, {
    useNewUrlParser: true
  })

  mongoose.connection
    .on('error', (...args) => console.error('connection error:', ...args))
    .once('open', () => console.log('connection successfully established'))
}
