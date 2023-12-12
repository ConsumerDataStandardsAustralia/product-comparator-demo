import {conoutInfo, conoutHtmlError, conoutError} from '../conout/actions'

const AEMO_URL = 'https://api.aemo.com.au/NEMRetail/cds-au/v1'

export const RETRIEVE_AEMO_STATUS = 'RETRIEVE_AEMO_STATUS'
export const RETRIEVE_AEMO_OUTAGES = 'RETRIEVE_AEMO_OUTAGES'

const headers = {
  'Accept': 'application/json',
  'x-v': 1
}

function createConoutError(error, url) {
  return conoutError('Caught ' + error + ' while requesting ' + url + (error.name === 'TypeError' ?
    ' Possibly caused by the endpoint not supporting Cross-Origin Requests (CORS)' : ''))
}

export const retrieveStatus = () => dispatch => {
  const fullUrl = AEMO_URL + '/discovery/status'
  const request = new Request(fullUrl, {headers})
  dispatch(conoutInfo('Requesting retrieveStatus(): ' + fullUrl))
  dispatch({
    type: RETRIEVE_AEMO_STATUS,
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
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
      })
  })
}

export const retrieveOutages = () => dispatch => {
  const fullUrl = AEMO_URL + '/discovery/outages'
  const request = new Request(fullUrl, {headers})
  dispatch(conoutInfo('Requesting retrieveOutages(): ' + fullUrl))
  dispatch({
    type: RETRIEVE_AEMO_OUTAGES,
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
        return obj
      })
      .catch(error => {
        dispatch(createConoutError(error, fullUrl))
      })
  })
}
