import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { APP_CONTAINER_SELECTOR } from '../config'

import App from './App'

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

ReactDOM.render(<App />, rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default
    ReactDOM.render(<App />, rootEl)
  })
}
