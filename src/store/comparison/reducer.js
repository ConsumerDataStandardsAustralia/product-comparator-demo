import { COMPARE_PRODUCTS } from './actions'

export default function(state=[], action) {
  if (action.type === COMPARE_PRODUCTS) {
    return [...action.payload]
  } else {
    return [...state]
  }
}
