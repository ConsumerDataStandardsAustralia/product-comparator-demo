import {conoutError} from '../conout/actions'

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
  return fetch('https://api.cdr.gov.au/cdr-register/v1/banking/data-holders/brands/summary')
    .then(response => response.json()).then(obj => obj.data)
    .catch(error => {
      dispatch(conoutError('Caught ' + error + ' while requesting Brands Summary'))
      return []
    })
  }

function loadLocalDatasources() {
  const ds = window.localStorage.getItem("cds-banking-prd-ds")
  return ds ? JSON.parse(ds) : false
}

export const loadDataSource = () => dispatch => {
  const ds = false
  dispatch({
    type: LOAD_DATA_SOURCE,
    payload: ds ? Promise.resolve(ds) : fetchDatasources(dispatch)
      // .then(datasources => {
      //   for (let i = 0; i < 4 && i < datasources.length; i++) {
      //     datasources[i].enabled = true
      //   }
      //   return datasources
      // })
  })
}

export function addDataSource() {
  return {
    type: ADD_DATA_SOURCE
  }
}

const MAJORS = ['ANZ', 'CBA', 'NAB', 'Westpac']

export function syncDataSources() {
  function saparateMajors(localDatasources, majorDatasources, minorDatasources) {
    localDatasources.forEach(ds => {
      if (majorDatasources.length < MAJORS.length && MAJORS.includes(ds.name)) {
        majorDatasources.push(ds)
      } else {
        minorDatasources.push(ds)
      }
    })
  }

  const nameSort = (a, b) => a.name < b.name ? -1 : 1

  return {
    type: SYNC_DATA_SOURCES,
    payload: fetchDatasources().then(datasources => {
      const localDatasources = loadLocalDatasources()
      if (localDatasources) {
        datasources.forEach(ds => {
          const lds = localDatasources.find(lds => lds.name === ds.name)
          if (lds) {
            lds.url = ds.url
            lds.sectors = ds.sectors
            lds.icon = ds.icon
          } else {
            localDatasources.push(ds)
          }
        })
        const majorDatasources = [], minorDatasources = []
        saparateMajors(localDatasources, majorDatasources, minorDatasources)
        return [...majorDatasources.sort(nameSort), ...minorDatasources.sort(nameSort)]
      }
      return datasources
    })
  }
}

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
