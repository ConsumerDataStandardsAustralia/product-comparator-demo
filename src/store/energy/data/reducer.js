import {
  START_RETRIEVE_PLAN_LIST,
  RETRIEVE_PLAN_LIST,
  RETRIEVE_PLAN_DETAIL,
  CLEAR_DATA
} from './actions'
import {fulfilled} from '../../../utils/async-actions'

export default function energy(state = [], action) {
  switch (action.type) {
    case START_RETRIEVE_PLAN_LIST: {
      const s = [...state]
      const {idx} = action.payload
      const item = s[idx]
      if (item) {
        item.progress = action.type
      } else {
        s[idx] = {
          progress: action.type,
          detailRecords: 0,
          failedDetailRecords: 0,
          plans: {}
        }
      }
      return s
    }
    case fulfilled(RETRIEVE_PLAN_LIST): {
      const s = [...state]
      const {idx, response} = action.payload
      const item = s[idx]
      item.progress = action.type
      item.totalRecords = response.meta.totalRecords
      response.data.plans.forEach(plan => item.plans[plan.planId] = plan)
      return s
    }
    case fulfilled(RETRIEVE_PLAN_DETAIL): {
      const s = [...state]
      const {idx, response} = action.payload
      const item = s[idx]
      if (response) {
        item.plans[response.data.planId] = response.data
        item.detailRecords++
      } else {
        item.failedDetailRecords++
      }
      return s
    }
    case CLEAR_DATA: {
      const s = [...state]
      s[action.payload] = null
      return s
    }
    default:
      return state
  }
}
