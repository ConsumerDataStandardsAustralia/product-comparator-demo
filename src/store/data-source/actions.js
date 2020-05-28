export const LOAD_DATA_SOURCE = 'LOAD_DATA_SOURCE'
export const ADD_DATA_SOURCE = 'ADD_DATA_SOURCE'
export const SAVE_DATA_SOURCE = 'SAVE_DATA_SOURCE'
export const DELETE_DATA_SOURCE = 'DELETE_DATA_SOURCE'
export const MODIFY_DATA_SOURCE_NAME = 'MODIFY_DATA_SOURCE_NAME'
export const MODIFY_DATA_SOURCE_URL = 'MODIFY_DATA_SOURCE_URL'
export const MODIFY_DATA_SOURCE_ICON = 'MODIFY_DATA_SOURCE_ICON'
export const ENABLE_DATA_SOURCE = 'ENABLE_DATA_SOURCE'

export function loadDataSource() {
  const ds = window.localStorage.getItem("cds-banking-prd-ds")
  return {
    type: LOAD_DATA_SOURCE,
    payload: ds ? Promise.resolve(JSON.parse(ds)) : fetch(process.env.PUBLIC_URL + '/datasources.json')
      .then(response => response.json())
      .then(datasources => {
        for (let i = 0; i < 4 && i < datasources.length; i++) {
          datasources[i].enabled = true
        }
        return datasources
      })
  }
}

export function addDataSource() {
  return {
    type: ADD_DATA_SOURCE
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
