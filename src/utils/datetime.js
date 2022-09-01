import {pattern} from 'iso8601-duration'

export function format(rfc3339DateTime) {
  return formatDate(new Date(Date.parse(rfc3339DateTime)).toString())
}

export function formatTimestamp() {
  return formatDate(Date())
}

function formatDate(date) {
  const index = date.indexOf('GMT')
  if (index > 0) return date.substring(0, index)
  return date
}

export function isDuration(str) {
  return pattern.test(str)
}
