import compression from 'compression'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { APP_NAME, STATIC_PATH, WEB_PORT, IS_PROD } from './config'
import index from './routes/index'
import thread from './routes/thread'

const app = express()
mongoose.connect(`mongodb://localhost/${APP_NAME}`)

app.use(compression())
app.use(bodyParser.json())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.use('/', index)
app.use('/thread', thread)

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${IS_PROD ? '(production)' : '(development)'}.`)
})
