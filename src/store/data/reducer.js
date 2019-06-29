import {
  START_RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  SELECT_PRODUCT,
  DESELECT_PRODUCT, DELETE_DATA
} from './actions'
import {fulfilled, rejected} from '../../utils/async-actions'

export default function(state = {selectedProducts:[], productList:[]}, action) {
  switch (action.type) {
    case START_RETRIEVE_PRODUCT_LIST:
      const s = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      s.productList[action.payload.dataSourceIdx] = {
        ...s.productList[action.payload.dataSourceIdx],
        progress: action.type,
        productListUrl: action.payload.productListUrl
      }
      return s
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      const a = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const {idx, response} = action.payload
      const item = a.productList[idx]
      a.productList[idx] = {
        ...a.productList[idx],
        progress: action.type,
        totalRecords: response.meta.totalRecords,
        records: !!item && !!item.records ? item.records + response.data.products.length : response.data.products.length,
        products: !!item && !!item.products ? [...item.products, ...response.data.products] : [...response.data.products],
        detailRecords: !!item && !!item.detailRecords ? item.detailRecords : 0,
        failedDetailRecords: 0,
        productDetails: !!item && !!item.productDetails ? [...item.productDetails] : []
      }
      return a
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const b = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const index = action.payload.idx
      const productDetails = [...b.productList[index].productDetails]
      let valid = !!action.payload.response.data
      if (valid) {
        productDetails.push(action.payload.response.data)
      }
      b.productList[index] = {
        ...b.productList[index],
        detailRecords: b.productList[index].detailRecords + (valid ? 1 : 0),
        failedDetailRecords: b.productList[index].failedDetailRecords + (valid ? 0: 1),
        productDetails: productDetails
      }
      return b
    case SELECT_PRODUCT:
      const {dataSourceIdx, product} = action.payload
      const d = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      d.selectedProducts.push({dataSourceIdx, product})
      return d
    case DESELECT_PRODUCT:
      const { payload } = action
      return {
        selectedProducts: state.selectedProducts.filter(
            prd => (prd.dataSourceIdx !== payload.dataSourceIdx || prd.product.productId !== payload.product.productId)),
        productList: [...state.productList]
      }
    case DELETE_DATA:
      const productList = [...state.productList]
      productList.splice(action.payload, 1)
      return {
        selectedProducts: state.selectedProducts.filter(prd => (prd.dataSourceIdx !== action.payload)),
        productList: productList
      }
    default:
      return {...state}
  }
}
