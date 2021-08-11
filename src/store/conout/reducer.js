import { CONSOLE_OUT } from './actions'

export default function conout(state = {actions: []}, action) {
  if (action.type === CONSOLE_OUT) {
      const { payload } = action
      state.actions.push(action)
      if (typeof payload.obj === 'undefined') {
        console[payload.lvl](payload.txt)
      } else {
        console[payload.lvl](payload.txt, payload.obj)
      }
    }
    return state
}
