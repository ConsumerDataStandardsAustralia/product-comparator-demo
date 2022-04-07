export const LOAD_VERSION_INFO = 'LOAD_VERSION_INFO'
export const SAVE_VERSION_INFO = 'SAVE_VERSION_INFO'
export const SET_VERSIONS_EDITABLE = 'SET_VERSIONS_EDITABLE'
export const SET_VERSIONS_READ_ONLY = 'SET_VERSIONS_READ_ONLY'

export function loadVersionInfo() {
  return {
    type: LOAD_VERSION_INFO
  }
}

export function saveVersionInfo(versionInfo) {
  return {
    type: SAVE_VERSION_INFO,
    versionInfo: versionInfo
  }
}

export function setVersionsEditable() {
  return {
    type: SET_VERSIONS_EDITABLE
  }
}

export function setVersionsReadOnly() {
  return {
    type: SET_VERSIONS_READ_ONLY
  }
}
