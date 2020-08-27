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
        failedDetailRecords: !!item && !!item.failedDetailRecords ? item.failedDetailRecords : 0,
        productDetails: !!item && !!item.productDetails ? [...item.productDetails] : []
      }
      return r
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const b = [...state]
      const index = action.payload.idx
      if (b[index].productDetails) {
        const productDetails = [...b[index].productDetails]
        let data = action.payload.response.data
        if (!!data && productDetails.some(prod => prod.productId === data.productId
            && prod.productCategory === data.productCategory)) {
          console.error(`Product with id ${data.productId} already exists in ${data.productCategory}`)
        } else {
          productDetails.push(data)
        }
        b[index] = {
          ...b[index],
          detailRecords: b[index].detailRecords + (data ? 1 : 0),
          failedDetailRecords: b[index].failedDetailRecords + (data ? 0 : 1),
          productDetails: productDetails
        }
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
