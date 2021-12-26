import { Reducer } from 'redux';
import { RequesterActionType, RequesterAction } from './actions'
import { fulfilled } from '../../utils/async-actions'

export interface RequesterState {
  response: any
}

export class RequesterResponseState implements RequesterState {
  constructor(public response: any) {}
}

export const requester: Reducer<RequesterState, RequesterAction> = (state: RequesterState = {response: null}, action: RequesterAction): any => {
  switch (action.type) {
    case fulfilled(RequesterActionType[RequesterActionType.REQUESTER_SELECT_ENDPOINT]):
      return new RequesterResponseState(null)
    case fulfilled(RequesterActionType[RequesterActionType.REQUESTER_CALL_ENDPOINT]):
      return new RequesterResponseState(action.payload)
    default:
      return state
  }
}