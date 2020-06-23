export const LOAD_VERSION_INFO = 'LOAD_VERSION_INFO'
export const SAVE_VERSION_INFO = 'SAVE_VERSION_INFO'

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
