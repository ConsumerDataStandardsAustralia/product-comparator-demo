export enum RequesterActionType {
  REQUESTER_SELECT_ENDPOINT,
  REQUESTER_CALL_ENDPOINT
}

export interface RequesterAction {
  type: string
  payload: any
}

export class RequesterActionPayload implements RequesterAction {
  constructor(public type: string, public payload: any) {}
}

export const callEndpoint = (urlStr: string, headers: any, params: any) => {
  console.log('callEndpoint(', urlStr, ', ', headers, ', ', params, ')')
  const url = new URL(urlStr);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return new RequesterActionPayload(
    RequesterActionType[RequesterActionType.REQUESTER_CALL_ENDPOINT],
    fetch(url.toString(), {headers}).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(`Response not OK. Status: ${response.status} (${response.statusText})`)
    })
    .then(obj => {
      console.log(`Received response for ${urlStr}:`, obj)
      return obj
    })
    .catch(error => {
      console.error('Caught while requesting', urlStr, ': ', error)
    })
  )
}
