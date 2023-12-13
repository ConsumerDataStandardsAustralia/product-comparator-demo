import {conoutInfo} from '../conout/actions'
import {createConoutError, checkExposedHeaders} from '../../utils/cors'

const AEMO_URL = 'https://api.aemo.com.au/NEMRetail/cds-au/v1'

export const RETRIEVE_AEMO_STATUS = 'RETRIEVE_AEMO_STATUS'
export const RETRIEVE_AEMO_OUTAGES = 'RETRIEVE_AEMO_OUTAGES'

const headers = {
  'Accept': 'application/json',
  'x-v': 1
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
          checkExposedHeaders(response, fullUrl, dispatch)
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
          checkExposedHeaders(response, fullUrl, dispatch)
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
