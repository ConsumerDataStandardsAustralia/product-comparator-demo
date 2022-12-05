import {conoutInfo, conoutError, conoutWarn} from '../../conout/actions'

export const START_RETRIEVE_PRODUCT_LIST = 'START_RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_LIST = 'RETRIEVE_PRODUCT_LIST'
export const RETRIEVE_PRODUCT_DETAIL = 'RETRIEVE_PRODUCT_DETAIL'
export const RETRIEVE_ALL_PRODUCT_DETAILS = 'RETRIEVE_ALL_PRODUCT_DETAILS'
export const DELETE_DATA = 'DELETE_DATA'
export const CLEAR_DATA = 'CLEAR_DATA'

export const startRetrieveProductList = (dataSourceIdx) => ({
  type: START_RETRIEVE_PRODUCT_LIST,
  payload: {idx: dataSourceIdx}
})

const headers = {
  'Accept': 'application/json'
}

function createConoutError(error, url) {
  return conoutError('Caught ' + error + ' while requesting ' + url + (error.name === 'TypeError' ?
    ' Possibly caused by the endpoint not supporting Cross-Origin Requests (CORS)' : ''))
}

export const retrieveProductList = (dataSourceIdx, baseUrl, productListUrl, xV, xMinV) =>
  (dispatch) => {
    const request = new Request(productListUrl, {headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})})
    dispatch(conoutInfo(`Requesting retrieveProductList() for ${productListUrl}`))
    const response = dispatch({
      type: RETRIEVE_PRODUCT_LIST,
      payload: fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
        })
        .then(obj => {
          dispatch(conoutInfo(`Received retrieveProductList() response for ${productListUrl}:`, obj))
          return obj
        })
        .catch(error => {
          dispatch(createConoutError(error, productListUrl))
          return {
            meta: {totalRecords: 0},
            data: {products: []},
            links: {}
          }
        })
        .then(json => ({idx: dataSourceIdx, response: json}))
    })
    response.then(({value})=> {
      const {products} = value.response.data
      const actions = products.map(product => retrieveProductDetail(dataSourceIdx, baseUrl, product.productId, xV, xMinV))
      const {next} = value.response.links
      if (!!next) {
        if (next === productListUrl) {
          dispatch(conoutError(`The link next should not be the same as the current page URL (${productListUrl}):`, value.response.links))
        } else {
          actions.push(retrieveProductList(dataSourceIdx, baseUrl, next, xV, xMinV))
        }
      }
      dispatch(retrieveAllProductDetails(actions))
    })
  }

export const retrieveProductDetail = (dataSourceIdx, url, productId, xV, xMinV) => (dispatch, getState) => {
  const fullUrl = url + '/banking/products/' + productId
  const request = new Request(fullUrl, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  dispatch(conoutInfo('Requesting retrieveProductDetail() for product ' + productId))
  dispatch({
    type: RETRIEVE_PRODUCT_DETAIL,
    payload: fetch(request)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
      })
      .then(obj => {
        dispatch(conoutInfo(`Received response for ${fullUrl}:`, obj))
        return obj
      })
      .then(json => {
        const { productDetails } = getState().banking[dataSourceIdx]
        const { data } = json
        if (productDetails.some(prod => prod.productId === data.productId
            && prod.productCategory === data.productCategory)) {
          dispatch(conoutWarn(`Product with id ${data.productId} already exists in ${data.productCategory}`))
          return {idx: dataSourceIdx, response: null}
        }
        return {idx: dataSourceIdx, response: json}
      })
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
        return {idx: dataSourceIdx, response: null}
      })
  })
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
