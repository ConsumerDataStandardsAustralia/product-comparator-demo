import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'
import conout from './conout/reducer'
import dataSources from './data-source/reducer'
import versionInfo from './version-info/reducer'
import data from './data/reducer'
import selection from './selection/reducer'
import comparison from './comparison/reducer'

const rootReducer = combineReducers({
  conout,
  dataSources,
  versionInfo,
  data,
  selection,
  comparison
})

const logger = createLogger({ collapsed: true })
const middleWares = [thunk, promise, logger]
export default createStore(rootReducer, applyMiddleware(...middleWares))
