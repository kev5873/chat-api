export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`
export const APP_NAME = 'chat-api'
export const STATIC_PATH = '/static'
export const WEB_PORT = process.env.PORT || 8000
export const IS_PROD = process.env.NODE_ENV === 'production'
export const WDS_PORT = 7000

export const MONGO_URL = 'mongodb://localhost/chatAPI'
export const MONGO_NAMESPACE_TEST = 'chatAPI-test'
export const MONGO_URL_TEST = `mongodb://localhost/${MONGO_NAMESPACE_TEST}`
