export const LOAD_DATA_SOURCE = 'LOAD_DATA_SOURCE'
export const ADD_DATA_SOURCE = 'ADD_DATA_SOURCE'
export const SAVE_DATA_SOURCE = 'SAVE_DATA_SOURCE'
export const DELETE_DATA_SOURCE = 'DELETE_DATA_SOURCE'
export const MODIFY_DATA_SOURCE = 'MODIFY_DATA_SOURCE'

export function loadDataSource() {
  return {
    type: LOAD_DATA_SOURCE
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

export function modifyDataSource(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE,
    index: index,
    payload: payload
  }
}
