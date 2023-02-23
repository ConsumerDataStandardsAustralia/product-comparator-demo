import {conoutError} from '../conout/actions'
import {MAJOR_NAMES, sortWithMajors} from '../../utils/ds-utils'

export const LOAD_DATA_SOURCE = 'LOAD_DATA_SOURCE'
export const ADD_DATA_SOURCE = 'ADD_DATA_SOURCE'
export const SYNC_DATA_SOURCES = 'SYNC_DATA_SOURCES'
export const SAVE_DATA_SOURCE = 'SAVE_DATA_SOURCE'
export const DELETE_DATA_SOURCE = 'DELETE_DATA_SOURCE'
export const MODIFY_DATA_SOURCE_NAME = 'MODIFY_DATA_SOURCE_NAME'
export const MODIFY_DATA_SOURCE_URL = 'MODIFY_DATA_SOURCE_URL'
export const MODIFY_DATA_SOURCE_ICON = 'MODIFY_DATA_SOURCE_ICON'
export const ENABLE_DATA_SOURCE = 'ENABLE_DATA_SOURCE'

function fetchDatasources(dispatch) {
  const request = new Request('https://api.cdr.gov.au/cdr-register/v1/banking/data-holders/brands/summary', {
    headers: new Headers({'x-v': 1})
  })
  return fetch(request)
    .then(response => response.json())
    .then(obj => {
      if (obj.error) {
        dispatch(conoutError('Received error: ' + obj.error))
        return []
      }
      return sortWithMajors(obj.data)
    })
    .catch(error => {
      dispatch(conoutError('Caught ' + error + ' while requesting Brands Summary'))
      return []
    })
}

function loadLocalDatasources() {
  let ds = window.localStorage.getItem("cds-banking-prd-ds")
  if (ds) {
    if (ds[0].name) { // Old format. Remap to the Register field names
      ds = ds.map(({name, url, icon, sectors}) => ({brandName: name, publicBaseUri: url, logoUri: icon, industries: sectors}));
    }
    return JSON.parse(ds)
  }
  return false
}

export const loadDataSource = () => dispatch => {
  const ds = loadLocalDatasources()
  dispatch({
    type: LOAD_DATA_SOURCE,
    payload: ds ? Promise.resolve(ds) : fetchDatasources(dispatch)
      .then(datasources => {
        for (let i = 0; i < 4 && i < datasources.length; i++) {
          datasources[i].enabled = true
        }
        return datasources
      })
  })
}

export function addDataSource() {
  return {
    type: ADD_DATA_SOURCE
  }
}

export const syncDataSources = () => dispatch => dispatch({
  type: SYNC_DATA_SOURCES,
  payload: fetchDatasources(dispatch).then(datasources => {
    const localDatasources = loadLocalDatasources()
    if (localDatasources) {
      datasources.forEach(ds => {
        const lds = localDatasources.find(lds => ((lds.brandName === ds.brandName) || (MAJOR_NAMES[ds.brandName] && MAJOR_NAMES[ds.brandName].includes(lds.brandName))))
        if (lds) {
          lds.brandName = ds.brandName
          lds.publicBaseUri = ds.publicBaseUri
          lds.industries = ds.industries
          lds.logoUri = ds.logoUri
        } else {
          localDatasources.push(ds)
        }
      })
      return localDatasources
    }
    return datasources
  })
})

export function saveDataSource(index, payload) {
  return {
    type: SAVE_DATA_SOURCE,
    index: index,
    payload: payload
  }
}

export function deleteDataSource(index) {
  return {
    type: DELETE_DATA_SOURCE,
    index: index
  }
}

export function modifyDataSourceName(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_NAME,
    index: index,
    payload: payload
  }
}

export function modifyDataSourceUrl(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_URL,
    index: index,
    payload: payload
  }
}

export function modifyDataSourceIcon(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_ICON,
    index: index,
    payload: payload
  }
}

export function enableDataSource(index, payload) {
  return {
    type: ENABLE_DATA_SOURCE,
    index: index,
    payload: payload
  }
}
