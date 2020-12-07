import {SELECT_PRODUCT, DESELECT_PRODUCT, CLEAR_SELECTION} from './actions'

export default function selection(state = [], action) {
    switch (action.type) {
        case SELECT_PRODUCT:
            return [...state, action.payload]
        case DESELECT_PRODUCT:
            const { payload } = action
            return state.filter(prd => (prd.dataSourceIdx !== payload.dataSourceIdx || prd.product.productId !== payload.product.productId))
        case CLEAR_SELECTION:
            return state.filter(prd => (prd.dataSourceIdx !== action.payload))
        default:
            return [...state]
    }
}
