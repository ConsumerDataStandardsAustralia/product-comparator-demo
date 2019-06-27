import {
  RETRIEVE_PRODUCT_LIST,
  RETRIEVE_PRODUCT_DETAIL,
  RETRIEVE_ALL_PRODUCT_DETAILS,
  SELECT_PRODUCT,
  DESELECT_PRODUCT
} from './actions'
import {
  pending,
  fulfilled,
  rejected
} from '../../utils/async-actions'

export default function(state = {selectedProducts: []}, action) {
  switch (action.type) {
    case pending(RETRIEVE_PRODUCT_LIST):
      return {...state, progress: action.type }
    case rejected(RETRIEVE_PRODUCT_LIST):
      return {...state, progress: action.type }
    case fulfilled(RETRIEVE_PRODUCT_LIST):
      return {
        ...state,
        progress: action.type,
        totalRecords: action.payload.meta.totalRecords,
        records: 0
      }
    case fulfilled(RETRIEVE_PRODUCT_DETAIL):
      return {
        ...state,
        progress: action.type,
        totalRecords: state.totalRecords,
        records: state.records + 1
      }
    case fulfilled(RETRIEVE_ALL_PRODUCT_DETAILS):
      return {
        ...state,
        progress: action.type,
        totalRecords: state.totalRecords,
        records: state.records,
        products: action.payload.map(({value}) => value.data)
      }
    case rejected(RETRIEVE_ALL_PRODUCT_DETAILS):
      return {
        ...state,
        progress: action.type,
        totalRecords: state.totalRecords,
        records: state.records
      }
    case SELECT_PRODUCT:
      const {dataSourceIdx, productId} = action.payload
      const selectedProducts = [...state.selectedProducts]
      selectedProducts.push({dataSourceIdx: dataSourceIdx, productId: productId})
      return {
        ...state,
        selectedProducts: selectedProducts
      }
    case DESELECT_PRODUCT:
      const { payload } = action
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          prd => (prd.dataSourceIdx !== payload.dataSourceIdx || prd.productId !== payload.productId))
      }
    default:
      return {...state}
  }
}
