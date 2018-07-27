const mongoose = require('mongoose')
const { user, pass } = require('../auth.json')

exports = module.exports = () => {
  mongoose.connect(`mongodb://${user}:${pass}@ds131312.mlab.com:31312/myretail-api`, {
    useNewUrlParser: true
  })

  return new Promise((resolve, reject) => {
    mongoose.connection.on('error', reject).once('open', resolve)
  })
}
