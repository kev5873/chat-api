import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { APP_CONTAINER_SELECTOR } from '../config'

import App from './App'

// eslint-disable-next-line
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

ReactDOM.render(<App />, rootEl)

if (module.hot) {
  // eslint-disable-next-line
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const NextApp = require('./App').default
    ReactDOM.render(<App />, rootEl)
  })
}
