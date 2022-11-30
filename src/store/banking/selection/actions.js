export const SELECT_BANKING_PRODUCT = 'SELECT_BANKING_PRODUCT'
export const DESELECT_BANKING_PRODUCT = 'DESELECT_BANKING_PRODUCT'
export const CLEAR_BANKING_SELECTION = 'CLEAR_BANKING_SELECTION'

export const selectProduct = (dataSourceIdx, product) => ({
    type: SELECT_BANKING_PRODUCT,
    payload: { dataSourceIdx, product }
})

export const deselectProduct = (dataSourceIdx, product) => ({
    type: DESELECT_BANKING_PRODUCT,
    payload: { dataSourceIdx, product }
})

export const clearSelection = (dataSourceIdx) => ({
    type: CLEAR_BANKING_SELECTION,
    payload: dataSourceIdx
})
