import { normalise } from "../../utils/url";

export const RETRIEVE_PRODUCT_LIST = 'RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_DETAIL = 'RETRIEVE_PRODUCT_DETAIL'
export const RETRIEVE_ALL_PRODUCT_DETAILS = 'RETRIEVE_ALL_PRODUCT_DETAILS'
export const SELECT_PRODUCT = 'SELECT_PRODUCT'
export const DESELECT_PRODUCT = 'DESELECT_PRODUCT'

export const retrieveProductList = (dataSourceIdx, url) => {
  const normalisedUrl = normalise(url)
  return (dispatch) => {
    const response = dispatch({
      type: RETRIEVE_PRODUCT_LIST,
      payload: fetch(normalisedUrl + '/banking/products').then(response => response.json())
    })
    response.then(({value})=> {
      const {products} = value.data
      const actions = products.map(product => retrieveProductDetail(normalisedUrl, product.productId))
      dispatch(retrieveAllProductDetails(dataSourceIdx, actions))
    })
  }
}

export const retrieveProductDetail = (url, productId) => ({
  type: RETRIEVE_PRODUCT_DETAIL,
  payload: fetch(url + '/banking/products/' + productId).then(response => response.json())
})

export const retrieveAllProductDetails = (name, actions) => dispatch => dispatch({
  type: RETRIEVE_ALL_PRODUCT_DETAILS,
  payload: Promise.all(actions.map((action) => dispatch(action)))
})

export const selectProduct = (dataSourceIdx, productId) => ({
  type: SELECT_PRODUCT,
  payload: { dataSourceIdx, productId }
})

export const deselectProduct = (dataSourceIdx, productId) => ({
  type: DESELECT_PRODUCT,
  payload: { dataSourceIdx, productId }
})
