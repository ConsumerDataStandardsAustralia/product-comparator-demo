import {
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  RETRIEVE_ALL_PRODUCT_DETAILS,
  SELECT_PRODUCT,
  DESELECT_PRODUCT
} from './actions'
import {fulfilled, pending} from '../../utils/async-actions'

export default function(state = {selectedProducts:[], productList:[]}, action) {
  switch (action.type) {
    case pending(RETRIEVE_PRODUCT_LIST):
      return {...state}
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      const a = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const {idx, response} = action.payload
      a.productList[idx] = {...a.productList[idx], progress: action.type, totalRecords: response.meta.totalRecords, records: 0, products:[]}
      return a
    case pending(RETRIEVE_PRODUCT_DETAIL):
      return {...state}
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const b = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const index = action.payload.idx
      const products = [...b.productList[index].products]
      products.push(action.payload.response.data)
      b.productList[index] = {...b.productList[index], progress: action.type, records: b.productList[index].records + 1, products:products}
      return b
    case pending(RETRIEVE_ALL_PRODUCT_DETAILS):
      return {...state}
    case fulfilled(RETRIEVE_ALL_PRODUCT_DETAILS):
      const c = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const dsIdx = action.payload[0].value.idx
      c.productList[dsIdx] = {...c.productList[dsIdx], progress: action.type}
      return c
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
    default:
      return {...state}
  }
}
