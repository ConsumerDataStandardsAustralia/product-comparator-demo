import {
  LOAD_DATA_SOURCE,
  ADD_DATA_SOURCE,
  SAVE_DATA_SOURCE,
  DELETE_DATA_SOURCE,
  MODIFY_DATA_SOURCE
} from './actions'

export default function(state, action) {
  switch (action.type) {
    case LOAD_DATA_SOURCE:
      // TODO load data source from local storage
      return []
    case ADD_DATA_SOURCE:
      return [...state, {name: '', url: ''}]
    case SAVE_DATA_SOURCE:
      return state.map((dataSource, index) => (index === action.index ? {...action.payload, saved: true} : dataSource))
    case DELETE_DATA_SOURCE:
      const dataSources = [...state]
      console.log('before', state)
      dataSources.splice(action.index, 1)
      console.log('after', dataSources)
      return dataSources
    case MODIFY_DATA_SOURCE:
      return state.map((dataSource, index) => (index === action.index ? {...action.payload, saved: false} : dataSource))
    default:
      return []
  }
}
