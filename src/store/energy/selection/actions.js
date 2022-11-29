export const SELECT_ENERGY_PLAN = 'SELECT_ENERGY_PLAN'
export const DESELECT_ENERGY_PLAN = 'DESELECT_ENERGY_PLAN'
export const CLEAR_ENERGY_SELECTION = 'CLEAR_ENERGY_SELECTION'

export const selectPlan = (dataSourceIdx, plan) => ({
    type: SELECT_ENERGY_PLAN,
    payload: { dataSourceIdx, plan }
})

export const deselectPlan = (dataSourceIdx, plan) => ({
    type: DESELECT_ENERGY_PLAN,
    payload: { dataSourceIdx, plan }
})

export const clearSelection = (dataSourceIdx) => ({
    type: CLEAR_ENERGY_SELECTION,
    payload: dataSourceIdx
})
