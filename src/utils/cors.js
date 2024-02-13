import {conoutHtmlError, conoutError} from '../store/conout/actions'

export function createConoutError(error, url) {
  return conoutError('Caught ' + error + ' while requesting ' + url + (error.name === 'TypeError' ?
    ' Possibly caused by the endpoint not supporting Cross-Origin Requests (CORS)' : ''))
}

export function checkExposedHeaders(response, fullUrl, dispatch) {
  if (!response.headers.get('x-v')) {
    const msg = `Response for ${fullUrl}: doesn't expose header x-v: possibly caused by incomplete `
    const corsSupport = 'CORS support'
    dispatch(conoutHtmlError(
      msg + corsSupport,
      `${msg}<a href="https://cdr-support.zendesk.com/hc/en-us/articles/900003054706-CORS-support" target="_blank">${corsSupport}</a>`
    ))
  }
}
