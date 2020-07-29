import {
  LOAD_VERSION_INFO,
  SAVE_VERSION_INFO
} from './actions'

export default function(state={xV: 1, xMinV: 1}, action) {
  switch (action.type) {
    case LOAD_VERSION_INFO:
      return {xV: loadVersionField("x-v") || 3, xMinV: loadVersionField("x-min-v") || 1}
    case SAVE_VERSION_INFO:
      const vi = action.versionInfo
      saveVersionField("x-v", vi.xV)
      saveVersionField("x-min-v", vi.xMinV)
      return vi
    default:
      return {...state}
  }
}

function loadVersionField(vf) {
  return window.localStorage.getItem(vf)
}

function saveVersionField(vf, value) {
  window.localStorage.setItem(vf, value)
}
