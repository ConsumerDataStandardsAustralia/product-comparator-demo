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
  console.log('Requester reducer. Action:', action)
  switch (action.type) {
    case RequesterActionType[RequesterActionType.REQUESTER_SELECT_ENDPOINT]:
      return state
    case fulfilled(RequesterActionType[RequesterActionType.REQUESTER_CALL_ENDPOINT]):
      console.log('Reducing REQUESTER_CALL_ENDPOINT. Action URL:', action.payload)
      return new RequesterResponseState(action.payload)
    default:
      return state
  }
}