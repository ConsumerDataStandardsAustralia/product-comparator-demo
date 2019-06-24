import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import rootReducer from './reducer'

const logger = createLogger({ collapsed: true })
const middleWares = [thunk, promise, logger]
export default createStore(rootReducer, applyMiddleware(...middleWares))
