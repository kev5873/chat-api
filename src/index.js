import compression from 'compression'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { STATIC_PATH, WEB_PORT, IS_PROD, MONGO_URL } from './config'
import index from './routes/index'
import thread from './routes/thread'

const app = express()
mongoose.connect(MONGO_URL).catch((err) => {
  console.log(err)
})

app.use(compression())
app.use(bodyParser.json())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.use('/', index)
app.use('/thread', thread)

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on port ${WEB_PORT} ${IS_PROD ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
