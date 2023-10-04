export const CONSOLE_OUT = 'CONSOLE_OUT'
export const CONSOLE_REFRESH = 'CONSOLE_REFRESH'
export const CONSOLE_CLEAN = 'CONSOLE_CLEAN'

export const conoutInfo = (txt, obj) => {
  return createLogEntry({lvl: 'log', txt, obj})
}

export const conoutTrace = (txt, obj) => {
  return createLogEntry({lvl: 'trace', txt, obj})
}

export const conoutWarn = (txt, obj) => {
  return createLogEntry({lvl: 'warn', txt, obj})
}

export const conoutError = (txt, obj) => {
  return createLogEntry({lvl: 'error', txt, obj})
}

export const conoutHtmlError = (txt, html, obj) => {
  return createLogEntry({lvl: 'error', txt, html, obj})
}

function createLogEntry(payload) {
  return {
    type: CONSOLE_OUT,
    payload,
    timestamp: new Date()
  }
}

export const refreshConout = () => ({
  type: CONSOLE_REFRESH
})

export const cleanConout = () => ({
  type: CONSOLE_CLEAN
})
