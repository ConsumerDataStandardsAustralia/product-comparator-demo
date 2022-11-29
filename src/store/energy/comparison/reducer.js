import { COMPARE_ENERGY_PLANS } from './actions'

export default function energyComparison(state=[], action) {
  if (action.type === COMPARE_ENERGY_PLANS) {
    return [...action.payload]
  } else {
    return state
  }
}
