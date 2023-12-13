import {conoutInfo, conoutError} from '../../conout/actions'
import {createConoutError, checkExposedHeaders} from '../../../utils/cors'
import {encodeRFC3986URIComponent} from '../../../utils/url'

export const START_RETRIEVE_PLAN_LIST = 'START_RETRIEVE_PLAN_LIST'
export const RETRIEVE_PLAN_LIST = 'RETRIEVE_PLAN_LIST'
export const RETRIEVE_PLAN_DETAIL = 'RETRIEVE_PLAN_DETAIL'
export const RETRIEVE_ALL_PLAN_DETAILS = 'RETRIEVE_ALL_PLAN_DETAILS'
export const CLEAR_DATA = 'CLEAR_ENERGY_DATA'

export const startRetrievePlanList = (dataSourceIdx) => ({
  type: START_RETRIEVE_PLAN_LIST,
  payload: {idx: dataSourceIdx}
})

const headers = {
  'Accept': 'application/json'
}

export const retrievePlanList = (dataSourceIdx, baseUrl, planListUrl, xV, xMinV, effective, fuelType) =>
  (dispatch) => {
    const request = new Request(planListUrl, {headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})})
    dispatch(conoutInfo(`Requesting retrievePlanList() for ${planListUrl}`))
    const response = dispatch({
      type: RETRIEVE_PLAN_LIST,
      payload: fetch(request)
        .then(response => {
          if (response.ok) {
            checkExposedHeaders(response, planListUrl, dispatch)
            return response.json()
          }
          throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
        })
        .then(obj => {
          dispatch(conoutInfo(`Received retrievePlanList() response for ${planListUrl}:`, obj))
          return obj
        })
        .catch(error => {
          dispatch(createConoutError(error, planListUrl))
          return {
            meta: {totalRecords: 0},
            data: {plans: []},
            links: {}
          }
        })
        .then(json => ({idx: dataSourceIdx, response: json}))
    })
    response.then(({value})=> {
      const {plans} = value.response.data
      const actions = plans.map(plan => retrievePlanDetail(dataSourceIdx, baseUrl, plan.planId, xV, xMinV))
      const {next} = value.response.links
      if (!!next) {
        const proxyRegExp = RegExp('^(https?://.*)(https?://.*)', 'gi') // RegExp objects are not thread safe
        const proxyInfo = proxyRegExp.exec(planListUrl)
        if ((proxyInfo && (next === proxyInfo[2])) || (!proxyInfo && (next === planListUrl))) {
          dispatch(conoutError(`The link next should not be the same as the current page URL (${planListUrl}):`, value.response.links))
        } else {
          actions.push(retrievePlanList(dataSourceIdx, baseUrl, proxyInfo ? proxyInfo[1] + next : next, xV, xMinV, effective, fuelType))
        }
      }
      dispatch(retrieveAllPlanDetails(actions))
    })
  }

export const retrievePlanDetail = (dataSourceIdx, url, planId, xV, xMinV) => (dispatch, getState) => {
  const fullUrl = url + '/energy/plans/' + encodeRFC3986URIComponent(planId)
  const request = new Request(fullUrl, {
    headers: new Headers({...headers, 'x-v': xV, 'x-min-v': xMinV})
  })
  dispatch(conoutInfo('Requesting retrievePlanDetail() for plan ' + planId))
  dispatch({
    type: RETRIEVE_PLAN_DETAIL,
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
        return {idx: dataSourceIdx, response: null}
      })
  })
}

export const retrieveAllPlanDetails = (actions) => dispatch => dispatch({
  type: RETRIEVE_ALL_PLAN_DETAILS,
  payload: Promise.all(actions.map(action => dispatch(action)))
})

export const clearData = (dataSourceIdx) => ({
  type: CLEAR_DATA,
  payload: dataSourceIdx
})
