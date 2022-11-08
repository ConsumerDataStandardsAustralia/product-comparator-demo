import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import conout from './conout/reducer'
import dataSources from './data-source/reducer'
import versionInfo from './version-info/reducer'
import data from './data/reducer'
import energy from './energy/data/reducer'
import selection from './selection/reducer'
import comparison from './comparison/reducer'

const rootReducer = combineReducers({
  conout,
  dataSources,
  versionInfo,
  data,
  energy,
  selection,
  comparison
})

const middleWares = [thunk, promise]
export default createStore(rootReducer, applyMiddleware(...middleWares))
