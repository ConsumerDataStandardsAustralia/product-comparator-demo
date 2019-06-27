import {
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  RETRIEVE_ALL_PRODUCT_DETAILS
} from './actions'
import {
  pending,
  fulfilled,
  rejected
} from '../../utils/async-actions'

export default function(state = {}, action) {
  switch (action.type) {
    case pending(RETRIEVE_PRODUCT_LIST):
      return { progress: action.type }
    case rejected(RETRIEVE_PRODUCT_LIST):
      return { progress: action.type }
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      return {
        progress: action.type,
        totalRecords: action.payload.meta.totalRecords,
        records: 0
      }
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      return {
        progress: action.type,
        totalRecords: state.totalRecords,
        records: state.records + 1
      }
    case fulfilled(RETRIEVE_ALL_PRODUCT_DETAILS):
      return {
        progress: action.type,
        totalRecords: state.totalRecords,
        records: state.records,
        products: action.payload.map(({value}) => value.data)
      }
    case rejected(RETRIEVE_ALL_PRODUCT_DETAILS):
      return {
        progress: action.type,
        totalRecords: state.totalRecords,
        records: state.records
      }
    default:
      return {...state}
  }
}
