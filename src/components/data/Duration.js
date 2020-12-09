import React from 'react'
import { parse } from 'iso8601-duration'
import pluralize from 'pluralize'

const Duration = props => {
  let showNum
  const duration = parse(props.value)
  const units = ['year', 'month', 'day', 'hour', 'minute', 'second']
  return units.map(unit => {
    const num = duration[unit + 's']
    if (!num) {
      return false
    }
    showNum ||= num > 1 || units.filter(u => u !== unit && duration[u + 's']).length > 0
    return <span>{showNum ? ' ' + num : ''} {pluralize(unit, num)}</span>
  })
}

export default Duration
