import { APP_CONTAINER_CLASS, APP_NAME, STATIC_PATH, WEB_PORT, WDS_PORT, IS_PROD } from './config'

const renderApp = (title, reactElement) =>
`<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  </head>
  <body>
    <div class="${APP_CONTAINER_CLASS}">${reactElement}</div>
    <script src="${IS_PROD ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </body>
</html>
`

export default renderApp
