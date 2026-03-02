import React from 'react'
import { pattern, parse } from 'iso8601-duration'
import pluralize from 'pluralize'

const Duration = props => {
  const { prefix, value, alwaysShowNumber } = props
  let showNum
  if (!value || value.length === 0) {
    return false
  }
  if (!pattern.test(value)) {
    return <span>{value}</span>
  }
  const duration = parse(value)
  const units = ['year', 'month', 'day', 'hour', 'minute', 'second']
  return <span>{prefix ? prefix + ' ' : ''}{units.map((unit, idx) => {
    const num = duration[unit + 's']
    if (!num) {
      return false
    }
    if (alwaysShowNumber) {
      return <span key={idx}> {num} {pluralize(unit, num)}</span>
    }
    showNum ||= num > 1 || units.filter(u => u !== unit && duration[u + 's']).length > 0
    return <span key={idx}>{showNum ? ' ' + num : ''} {pluralize(unit, num)}</span>
  })}</span>
}

export default Duration
