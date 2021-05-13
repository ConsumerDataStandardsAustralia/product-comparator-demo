export const CONSOLE_OUT_INFO = 'CONSOLE_OUT_INFO'
export const CONSOLE_OUT_TRACE = 'CONSOLE_OUT_TRACE'
export const CONSOLE_OUT_WARN = 'CONSOLE_OUT_WARN'
export const CONSOLE_OUT_ERROR = 'CONSOLE_OUT_ERROR'

export const conoutInfo = (txt, obj) => {
  return {
    type: CONSOLE_OUT_INFO,
    payload: {txt, obj},
    timestamp: new Date()
  }
}

export const conoutTrace = (txt, obj) => {
  return {
    type: CONSOLE_OUT_TRACE,
    payload: {txt, obj},
    timestamp: new Date()
  }
}

export const conoutWarn = (txt, obj) => {
  return {
    type: CONSOLE_OUT_WARN,
    payload: {txt, obj},
    timestamp: new Date()
  }
}

export const conoutError = (txt, obj) => {
  return {
    type: CONSOLE_OUT_ERROR,
    payload: {txt, obj},
    timestamp: new Date()
  }
}