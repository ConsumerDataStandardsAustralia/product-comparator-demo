import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'
import dataSources from './data-source/reducer'
import data from './data/reducer'

const rootReducer = combineReducers({
  dataSources,
  data
})

const logger = createLogger({ collapsed: true })
const middleWares = [thunk, promise, logger]
export default createStore(rootReducer, applyMiddleware(...middleWares))
