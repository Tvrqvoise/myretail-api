if (process.env.NODE_ENV !== 'production') require('babel-register')

const app = require('./app')
const establishDBConnection = require('./db')

const port = process.env.PORT || 3000

async function start () {
  await establishDBConnection()
  console.log('database connection established')
  app.listen(port, () => console.log(`app listening at ${port}`))
}

start()
