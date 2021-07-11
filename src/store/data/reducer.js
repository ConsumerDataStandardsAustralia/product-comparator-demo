import {
  START_RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  RETRIEVE_STATUS,
  RETRIEVE_OUTAGES,
  DELETE_DATA,
  CLEAR_DATA
} from './actions'
import {fulfilled} from '../../utils/async-actions'

export default function data(state = [], action) {
  const s = [...state]
  const {idx, response} = action.payload
  const item = s[idx]
  switch (action.type) {
    case START_RETRIEVE_PRODUCT_LIST:
      if (item) {
        item.progress = action.type
      } else {
        s[action.payload] = {
          progress: action.type,
          detailRecords: 0,
          failedDetailRecords: 0,
          productDetails: []
        }
      }
      return s
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      item.progress = action.type
      item.totalRecords = response.meta.totalRecords
      if (item.products) {
        item.products.push.apply(response.data.products)
      } else {
        item.products = response.data.products
      }
      return s
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const data = response.data
      if (data) {
        item.productDetails.push(data)
        item.detailRecords++
      } {
        item.failedDetailRecords++
      }
      return s
    case fulfilled(RETRIEVE_STATUS):
      if (action.payload) {
        const {ord, resp} = action.payload
        s[ord] = {
          ...s[ord],
          statusDetails: resp ? resp.data : null
        }
      }
      return s
    case fulfilled(RETRIEVE_OUTAGES):
      if (action.payload) {
        const {oord, oresp} = action.payload
        s[oord] = {
          ...s[oord],
          outagesDetails: oresp ? oresp.data : null
        }
      }
      return s
    case DELETE_DATA:
    case CLEAR_DATA:
      s[action.payload] = {}
      return s
    default:
      return s
  }
}
