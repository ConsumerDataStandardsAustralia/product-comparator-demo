import * as moment from 'moment'

export function format(rfc3339DateTime) {
  const date = new Date(Date.parse(rfc3339DateTime)).toString()
  const index = date.indexOf('GMT')
  if (index > 0) return date.substring(0, index)
  return date
}

export function isDuration(str) {
  return moment.isDuration(moment.duration(str))
}
