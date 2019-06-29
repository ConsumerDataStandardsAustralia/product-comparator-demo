export const START_RETRIEVE_PRODUCT_LIST = 'START_RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_LIST = 'RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_DETAIL = 'RETRIEVE_PRODUCT_DETAIL'
export const RETRIEVE_ALL_PRODUCT_DETAILS = 'RETRIEVE_ALL_PRODUCT_DETAILS'
export const SELECT_PRODUCT = 'SELECT_PRODUCT'
export const DESELECT_PRODUCT = 'DESELECT_PRODUCT'
export const DELETE_DATA = 'DELETE_DATA'

export const startRetrieveProductList = (dataSourceIdx, productListUrl) => ({
  type: START_RETRIEVE_PRODUCT_LIST,
  payload: { dataSourceIdx, productListUrl }
})

export const retrieveProductList = (dataSourceIdx, baseUrl, productListUrl) => {
  return (dispatch) => {
    const response = dispatch({
      type: RETRIEVE_PRODUCT_LIST,
      payload: fetch(productListUrl).then(
          response => response.json()).then(json=>({idx: dataSourceIdx, response: json}))
    })
    response.then(({value})=> {
      const {products} = value.response.data
      const actions = products.map(product => retrieveProductDetail(dataSourceIdx, baseUrl, product.productId))
      const {next} = value.response.links
      if (!!next && next !== productListUrl) {
        actions.push(retrieveProductList(dataSourceIdx, baseUrl, next))
      }
      dispatch(retrieveAllProductDetails(actions))
    })
  }
}

export const retrieveProductDetail = (dataSourceIdx, url, productId) => ({
  type: RETRIEVE_PRODUCT_DETAIL,
  payload: fetch(url + '/banking/products/' + productId).then(
      response => response.json()).then(json => ({idx: dataSourceIdx, response: json}))
})

export const retrieveAllProductDetails = (actions) => dispatch => dispatch({
  type: RETRIEVE_ALL_PRODUCT_DETAILS,
  payload: Promise.all(actions.map(action => dispatch(action)))
})

export const selectProduct = (dataSourceIdx, product) => ({
  type: SELECT_PRODUCT,
  payload: { dataSourceIdx, product }
})

export const deselectProduct = (dataSourceIdx, product) => ({
  type: DESELECT_PRODUCT,
  payload: { dataSourceIdx, product }
})

export const deleteData = (dataSourceIdx) => ({
  type: DELETE_DATA,
  payload: dataSourceIdx
})
