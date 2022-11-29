import {
  START_RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  DELETE_DATA,
  CLEAR_DATA
} from './actions'
import {fulfilled} from '../../../utils/async-actions'

export default function banking(state = [], action) {
  switch (action.type) {
    case START_RETRIEVE_PRODUCT_LIST: {
      const s = [...state]
      const {idx} = action.payload
      const item = s[idx]
      if (item) {
        item.progress = action.type
      } else {
        s[idx] = {
          progress: action.type,
          detailRecords: 0,
          failedDetailRecords: 0,
          products: [],
          productDetails: []
        }
      }
      return s
    }
    case fulfilled(RETRIEVE_PRODUCT_LIST): {
      const s = [...state]
      const {idx, response} = action.payload
      const item = s[idx]
      item.progress = action.type
      item.totalRecords = response.meta.totalRecords
      item.products = [...item.products, ...response.data.products]
      return s
    }
    case fulfilled(RETRIEVE_PRODUCT_DETAIL): {
      const s = [...state]
      const {idx, response} = action.payload
      const item = s[idx]
      if (response) {
        item.productDetails.push(response.data)
        item.detailRecords++
      } else {
        item.failedDetailRecords++
      }
      return s
    }
    case DELETE_DATA:
    case CLEAR_DATA: {
      const s = [...state]
      s[action.payload] = null
      return s
    }
    default:
      return state
  }
}
