import {
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  SELECT_PRODUCT,
  DESELECT_PRODUCT
} from './actions'
import {fulfilled, rejected} from '../../utils/async-actions'

export default function(state = {selectedProducts:[], productList:[]}, action) {
  switch (action.type) {
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      const a = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const {idx, response} = action.payload
      const item = a.productList[idx]
      a.productList[idx] = {
        ...a.productList[idx],
        totalRecords: response.meta.totalRecords,
        records: !!item && !!item.records ? item.records + response.data.products.length : response.data.products.length,
        products: !!item && !!item.products ? [...item.products, ...response.data.products] : [...response.data.products],
        detailRecords: !!item && !!item.detailRecords ? item.detailRecords : 0,
        productDetails: !!item && !!item.productDetails ? [...item.productDetails] : []
      }
      return a
    case rejected(RETRIEVE_PRODUCT_LIST):
      return {...state}
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      const b = {selectedProducts: [...state.selectedProducts], productList: [...state.productList]}
      const index = action.payload.idx
      const productDetails = [...b.productList[index].productDetails]
      productDetails.push(action.payload.response.data)
      b.productList[index] = {
        ...b.productList[index],
        detailRecords: b.productList[index].detailRecords + 1,
        productDetails: productDetails
      }
      return b
    case rejected(RETRIEVE_PRODUCT_DETAIL):
      return {...state}
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
