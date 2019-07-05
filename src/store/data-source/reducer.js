import {
  LOAD_DATA_SOURCE,
  ADD_DATA_SOURCE,
  SAVE_DATA_SOURCE,
  DELETE_DATA_SOURCE,
  MODIFY_DATA_SOURCE_NAME,
  MODIFY_DATA_SOURCE_URL
} from './actions'

const defaults = [
  {name: 'ANZ', url: 'https://api.anz/cds-au/v1', saved: true},
  {name: 'CBA', url: 'https://api.commbank.com.au/cds-au/v1', saved: true},
  {name: 'Westpac', url: 'https://digital-api.westpac.com.au/cds-au/v1', saved: true}
]

export default function(state=[], action) {
  switch (action.type) {
    case LOAD_DATA_SOURCE:
      return loadDataSources()
    case ADD_DATA_SOURCE:
      return [...state, {name: '', url: ''}]
    case SAVE_DATA_SOURCE:
      let dataSources = state.map((dataSource, index) => (index === action.index ? {...action.payload, saved: true} : dataSource));
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
      dataSources = state.map((dataSource, index) => (index === action.index ? {...action.payload, saved: false} : dataSource))
      persistSavedDataSources(dataSources)
      return dataSources
    default:
      return [...state]
  }
}

function persistSavedDataSources(dataSources) {
  window.localStorage.setItem("cds-banking-prd-ds", JSON.stringify(dataSources.filter(dataSource => dataSource.saved)))
}

function loadDataSources() {
  const ds = window.localStorage.getItem("cds-banking-prd-ds")
  return !!ds ? JSON.parse(ds) : defaults
}
