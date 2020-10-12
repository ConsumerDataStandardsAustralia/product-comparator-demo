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

export default function(state = [], action) {
  const s = [...state]
  switch (action.type) {
    case START_RETRIEVE_PRODUCT_LIST:
      s[action.payload] = {...s[action.payload] , progress: action.type}
      return s
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      const {idx, response} = action.payload
      const item = s[idx]
      s[idx] = {
        ...s[idx],
        progress: action.type,
        totalRecords: response.meta.totalRecords,
        products: !!item && !!item.products ? [...item.products, ...response.data.products] : [...response.data.products],
        detailRecords: !!item && !!item.detailRecords ? item.detailRecords : 0,
        failedDetailRecords: !!item && !!item.failedDetailRecords ? item.failedDetailRecords : 0,
        productDetails: !!item && !!item.productDetails ? [...item.productDetails] : []
      }
      return s
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const index = action.payload.idx
      if (s[index].productDetails) {
        const productDetails = [...s[index].productDetails]
        let data = action.payload.response.data
        if (!!data && productDetails.some(prod => prod.productId === data.productId
            && prod.productCategory === data.productCategory)) {
          console.error(`Product with id ${data.productId} already exists in ${data.productCategory}`)
        } else {
          productDetails.push(data)
        }
        s[index] = {
          ...s[index],
          detailRecords: s[index].detailRecords + (data ? 1 : 0),
          failedDetailRecords: s[index].failedDetailRecords + (data ? 0 : 1),
          productDetails: productDetails
        }
      }
      return s
    case fulfilled(RETRIEVE_STATUS):
      const {ord, resp} = action.payload
      s[ord] = {
        ...s[ord],
        statusDetails: resp ? resp.data : null
      }
      return s
    case fulfilled(RETRIEVE_OUTAGES):
      const {oord, oresp} = action.payload
      s[oord] = {
        ...s[oord],
        outagesDetails: oresp ? oresp.data : null
      }
      return s
    case DELETE_DATA:
      return s.splice(action.payload, 1)
    case CLEAR_DATA:
      s[action.payload] = {}
      return s
    default:
      return s
  }
}
