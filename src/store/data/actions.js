export const START_RETRIEVE_PRODUCT_LIST = 'START_RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_LIST = 'RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_DETAIL = 'RETRIEVE_PRODUCT_DETAIL'
export const RETRIEVE_ALL_PRODUCT_DETAILS = 'RETRIEVE_ALL_PRODUCT_DETAILS'
export const DELETE_DATA = 'DELETE_DATA'
export const CLEAR_DATA = 'CLEAR_DATA'

export const startRetrieveProductList = (dataSourceIdx) => ({
  type: START_RETRIEVE_PRODUCT_LIST,
  payload: dataSourceIdx
})

const headers = {
  'Accept': 'application/json'
}

export const retrieveProductList = (dataSourceIdx, baseUrl, productListUrl, xV, xMinV) => {
  const cors_proxy = 'https://prd-comparison-proxy.herokuapp.com/'
  const lowerCaseBaseUrl = baseUrl.toLowerCase()
  let finalBaseUrl = baseUrl, finalProductListUrl = productListUrl
  const origin = window.location.protocol + '//' + window.location.host
  if (!lowerCaseBaseUrl.startsWith(origin) && lowerCaseBaseUrl.indexOf('//localhost') === -1) {
    finalBaseUrl = cors_proxy + baseUrl
    finalProductListUrl = cors_proxy + productListUrl
  }
  return (dispatch) => {
    const request = new Request(finalProductListUrl, {headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})})
    const response = dispatch({
      type: RETRIEVE_PRODUCT_LIST,
      payload: fetch(request).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            console.error(response)
            return {
              meta: {totalRecords: 0},
              data: {products: []},
              links: {}
            }
          }
      }).then(json=>({idx: dataSourceIdx, response: json}))
    })
    response.then(({value})=> {
      const {products} = value.response.data
      const actions = products.map(product => retrieveProductDetail(dataSourceIdx, finalBaseUrl, product.productId, xV, xMinV))
      const {next} = value.response.links
      if (!!next && next !== productListUrl) {
        actions.push(retrieveProductList(dataSourceIdx, baseUrl, next, xV, xMinV))
      }
      dispatch(retrieveAllProductDetails(actions))
    })
  }
}

export const retrieveProductDetail = (dataSourceIdx, url, productId, xV, xMinV) => {
  const request = new Request(url + '/banking/products/' + productId, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  return {
    type: RETRIEVE_PRODUCT_DETAIL,
    payload: fetch(request).then(
        response => response.json()).then(json => ({idx: dataSourceIdx, response: json}))
  }
}

export const retrieveAllProductDetails = (actions) => dispatch => dispatch({
  type: RETRIEVE_ALL_PRODUCT_DETAILS,
  payload: Promise.all(actions.map(action => dispatch(action)))
})

export const deleteData = (dataSourceIdx) => ({
  type: DELETE_DATA,
  payload: dataSourceIdx
})

export const clearData = (dataSourceIdx) => ({
  type: CLEAR_DATA,
  payload: dataSourceIdx
})
