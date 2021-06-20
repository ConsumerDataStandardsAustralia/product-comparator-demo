import { CONSOLE_OUT } from './actions'

export default function conout(state = [], action) {
  if (action.type === CONSOLE_OUT) {
      const { payload } = action
      state = [...state, action]
      if (typeof payload.obj === 'undefined') {
        console[payload.lvl](payload.txt)
      } else {
        console[payload.lvl](payload.txt, payload.obj)
      }
    }
    return state
}
