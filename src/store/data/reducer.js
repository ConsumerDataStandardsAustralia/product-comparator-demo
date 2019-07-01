import {
  START_RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  DELETE_DATA,
  CLEAR_DATA
} from './actions'
import {fulfilled} from '../../utils/async-actions'

export default function(state = [], action) {
  switch (action.type) {
    case START_RETRIEVE_PRODUCT_LIST:
      let s = [...state]
      s[action.payload] = {...s[action.payload] , progress: action.type}
      return s
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      const r = [...state]
      const {idx, response} = action.payload
      const item = r[idx]
      r[idx] = {
        ...r[idx],
        progress: action.type,
        totalRecords: response.meta.totalRecords,
        products: !!item && !!item.products ? [...item.products, ...response.data.products] : [...response.data.products],
        detailRecords: !!item && !!item.detailRecords ? item.detailRecords : 0,
        failedDetailRecords: 0,
        productDetails: !!item && !!item.productDetails ? [...item.productDetails] : []
      }
      return r
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const b = [...state]
      const index = action.payload.idx
      const productDetails = [...b[index].productDetails]
      let valid = !!action.payload.response.data
      if (valid) {
        productDetails.push(action.payload.response.data)
      }
      b[index] = {
        ...b[index],
        detailRecords: b[index].detailRecords + (valid ? 1 : 0),
        failedDetailRecords: b[index].failedDetailRecords + (valid ? 0: 1),
        productDetails: productDetails
      }
      return b
    case DELETE_DATA:
      return state.filter((item, index) => (index !== action.payload))
    case CLEAR_DATA:
      const c = [...state]
      c[action.payload] = {}
      return c
    default:
      return [...state]
  }
}
