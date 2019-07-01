export const SELECT_PRODUCT = 'SELECT_PRODUCT'
export const DESELECT_PRODUCT = 'DESELECT_PRODUCT'
export const CLEAR_SELECTION = 'CLEAR_SELECTION'

export const selectProduct = (dataSourceIdx, product) => ({
    type: SELECT_PRODUCT,
    payload: { dataSourceIdx, product }
})

export const deselectProduct = (dataSourceIdx, product) => ({
    type: DESELECT_PRODUCT,
    payload: { dataSourceIdx, product }
})

export const clearSelection = (dataSourceIdx) => ({
    type: CLEAR_SELECTION,
    payload: dataSourceIdx
})
