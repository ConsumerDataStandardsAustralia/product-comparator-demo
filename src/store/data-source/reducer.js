import {
  ENABLE_DATA_SOURCE,
  LOAD_DATA_SOURCE,
  ADD_DATA_SOURCE,
  SAVE_DATA_SOURCE,
  DELETE_DATA_SOURCE,
  MODIFY_DATA_SOURCE_NAME,
  MODIFY_DATA_SOURCE_URL
} from './actions'
import {fulfilled} from '../../utils/async-actions'

export default function(state=[], action) {
  switch (action.type) {
    case fulfilled(LOAD_DATA_SOURCE):
      return action.payload
    case ADD_DATA_SOURCE:
      return [...state, {name: '', url: ''}]
    case SAVE_DATA_SOURCE:
      let dataSources = state.map((dataSource, index) => (index === action.index ? {...action.payload, unsaved: false} : dataSource));
      persistSavedDataSources(dataSources)
      return dataSources
    case DELETE_DATA_SOURCE:
      dataSources = [...state]
      dataSources.splice(action.index, 1)
      persistSavedDataSources(dataSources)
      return dataSources
    case MODIFY_DATA_SOURCE_NAME:
      dataSources = state.map((dataSource, index) => (index === action.index ? {...action.payload} : dataSource));
      persistSavedDataSources(dataSources)
      return dataSources
    case MODIFY_DATA_SOURCE_URL:
      dataSources = state.map((dataSource, index) => (index === action.index ? {...action.payload, unsaved: true} : dataSource))
      persistSavedDataSources(dataSources)
      return dataSources
    case ENABLE_DATA_SOURCE:
      dataSources = state.map((dataSource, index) => (index === action.index ? {...action.payload} : dataSource))
      persistSavedDataSources(dataSources)
      return dataSources
    default:
      return [...state]
  }
}

function persistSavedDataSources(dataSources) {
  window.localStorage.setItem("cds-banking-prd-ds", JSON.stringify(dataSources.filter(dataSource => !dataSource.unsaved)))
}
