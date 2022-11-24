export const SELECT_ENERGY_PLAN = 'SELECT_ENERGY_PLAN'
export const DESELECT_ENERGY_PLAN = 'DESELECT_ENERGY_PLAN'
export const CLEAR_ENERGY_SELECTION = 'CLEAR_ENERGY_SELECTION'

export const selectPlan = (dataSourceIdx, planId) => ({
    type: SELECT_ENERGY_PLAN,
    payload: { dataSourceIdx, planId }
})

export const deselectPlan = (dataSourceIdx, planId) => ({
    type: DESELECT_ENERGY_PLAN,
    payload: { dataSourceIdx, planId }
})

export const clearSelection = (dataSourceIdx) => ({
    type: CLEAR_ENERGY_SELECTION,
    payload: dataSourceIdx
})
