import {conoutInfo, conoutHtmlError, conoutError} from '../conout/actions'

export const RETRIEVE_STATUS = 'RETRIEVE_STATUS'
export const RETRIEVE_OUTAGES = 'RETRIEVE_OUTAGES'

const headers = {
  'Accept': 'application/json'
}

function createConoutError(error, url) {
  return conoutError('Caught ' + error + ' while requesting ' + url + (error.name === 'TypeError' ?
    ' Possibly caused by the endpoint not supporting Cross-Origin Requests (CORS)' : ''))
}

export const retrieveStatus = (dataSourceIdx, url, xV, xMinV) => dispatch => {
  const fullUrl = url + '/discovery/status'
  const request = new Request(fullUrl, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  dispatch(conoutInfo('Requesting retrieveStatus(): ' + fullUrl))
  dispatch({
    type: RETRIEVE_STATUS,
    payload: fetch(request)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
      })
      .then(obj => {
        dispatch(conoutInfo(`Received response for ${fullUrl}:`, obj))
        return {idx: dataSourceIdx, response: obj}
      })
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
      })
  })
}

export const retrieveOutages = (dataSourceIdx, url, xV, xMinV) => dispatch => {
  const fullUrl = url + '/discovery/outages'
  const request = new Request(fullUrl, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  dispatch(conoutInfo('Requesting retrieveOutages(): ' + fullUrl))
  dispatch({
    type: RETRIEVE_OUTAGES,
    payload: fetch(request)
      .then(response => {
        if (response.ok) {
          if (!response.headers['x-v']) {
            const msg = `Response for ${fullUrl}: doesn't expose header x-v: possibly caused by incomplete `
            const corsSupport = 'CORS support'
            dispatch(conoutHtmlError(
              msg + corsSupport,
              `${msg}<a href="https://cdr-support.zendesk.com/hc/en-us/articles/900003054706-CORS-support" target="_blank">${corsSupport}</a>`
            ))
          }
          return response.json()
        }
        throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
      })
      .then(obj => {
        dispatch(conoutInfo(`Received response for ${fullUrl}:`, obj))
        return {idx: dataSourceIdx, response: obj}
      })
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
      })
  })
}
