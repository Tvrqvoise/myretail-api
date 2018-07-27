const app = require('./app')
const establishDBConnection = require('./db')

async function start () {
  await establishDBConnection()
  app.listen(process.env.PORT || 3000)
}

start()
