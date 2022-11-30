import {SELECT_ENERGY_PLAN, DESELECT_ENERGY_PLAN, CLEAR_ENERGY_SELECTION} from './actions'

export default function energySelection(state = [], action) {
    switch (action.type) {
        case SELECT_ENERGY_PLAN:
            return [...state, action.payload]
        case DESELECT_ENERGY_PLAN:
            const { payload } = action
            return state.filter(selection => (selection.dataSourceIdx !== payload.dataSourceIdx || selection.plan.planId !== payload.plan.planId))
        case CLEAR_ENERGY_SELECTION:
            return state.filter(selection => (selection.dataSourceIdx !== action.payload))
        default:
            return state
    }
}
