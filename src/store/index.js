import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import conout from './conout/reducer'
import dataSources from './data-source/reducer'
import versionInfo from './version-info/reducer'
import banking from './banking/data/reducer'
import energy from './energy/data/reducer'
import energySelection from './energy/selection/reducer'
import discovery from './discovery/reducer'
import bankingSelection from './banking/selection/reducer'
import bankingComparison from './banking/comparison/reducer'
import energyComparison from './energy/comparison/reducer'

const rootReducer = combineReducers({
  conout,
  dataSources,
  versionInfo,
  banking,
  energy,
  discovery,
  bankingSelection,
  energySelection,
  bankingComparison,
  energyComparison
})

const middleWares = [thunk, promise]
export default createStore(rootReducer, applyMiddleware(...middleWares))
