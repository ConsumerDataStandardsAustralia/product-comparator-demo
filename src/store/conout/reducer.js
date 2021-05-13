import {
  CONSOLE_OUT_TRACE,
  CONSOLE_OUT_INFO,
  CONSOLE_OUT_WARN,
  CONSOLE_OUT_ERROR
} from './actions'

export default function conout(state = [], action) {
  switch (action.type) {
    case CONSOLE_OUT_INFO:
      state = [...state, action]
      console.log(action.payload.txt, action.payload.obj)
      return state
    case CONSOLE_OUT_WARN:
      state = [...state, action]
      console.warn(action.payload.txt, action.payload.obj)
      return state
    case CONSOLE_OUT_ERROR:
      state = [...state, action]
      console.error(action.payload.txt, action.payload.obj)
      return state
    case CONSOLE_OUT_TRACE:
      state = [...state, action]
      console.trace(action.payload.txt, action.payload.obj)
      return state
    default:
      return state
  }
}
