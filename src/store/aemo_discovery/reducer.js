import {
  RETRIEVE_AEMO_STATUS,
  RETRIEVE_AEMO_OUTAGES
} from './actions'
import {fulfilled} from '../../utils/async-actions'

export default function discovery(state = {}, action) {
  switch (action.type) {
    case fulfilled(RETRIEVE_AEMO_STATUS): {
      const s = {...state}
      if (action.payload) {
        const response = action.payload
        s.statusDetails = response ? response.data : null
      }
      return s  
    }
    case fulfilled(RETRIEVE_AEMO_OUTAGES): {
      const s = {...state}
      if (action.payload) {
        const response = action.payload
        s.outagesDetails = response ? response.data : null
      }
      return s
    }
    default:
      return state
  }
}
