import 'babel-polyfill'
import 'babel-core/register'

import express from 'express'
import template from '../template'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../client/App'
import ChatWindow from '../client/ChatWindow'

const router = express.Router()

router.get('/', (req, res) => {
  const reactElement = ReactDOMServer.renderToString(
    <App />,
  )
  res.send(template("Chat API Test", reactElement))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const reactElement = ReactDOMServer.renderToString(
    <App chatId={id} />
  )
  res.send(template("Chat API Test", reactElement))
})

export default router
