import 'babel-polyfill'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import template from '../template'
import App from '../client/App'

const router = express.Router()

router.get('/', (req, res) => {
  const reactElement = ReactDOMServer.renderToString(
    <App />,
  )
  res.send(template('Chat API Test', reactElement))
})

export default router
