import {
  RETRIEVE_STATUS,
  RETRIEVE_OUTAGES
} from './actions'
import {fulfilled} from '../../utils/async-actions'

export default function discovery(state = [], action) {
  switch (action.type) {
    case fulfilled(RETRIEVE_STATUS): {
      const s = [...state]
      if (action.payload) {
        const {idx, response} = action.payload
        if (!s[idx]) {
          s[idx] = {}
        }
        s[idx].statusDetails = response ? response.data : null
      }
      return s
    }
    case fulfilled(RETRIEVE_OUTAGES): {
      const s = [...state]
      if (action.payload) {
        const {idx, response} = action.payload
        if (!s[idx]) {
          s[idx] = {}
        }
        s[idx].outagesDetails = response ? response.data : null
      }
      return s
    }
    default:
      return state
  }
}
