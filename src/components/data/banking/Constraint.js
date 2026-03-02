import React from 'react'
import {translateConstraintType} from '../../../utils/dict'

const formatAdditionalValue = (constraintType, additionalValue) => {
  if (!additionalValue && additionalValue !== 0) {
    return ''
  }

  const value = additionalValue;

  switch (constraintType) {
    case 'MAX_BALANCE':
    case 'MAX_LIMIT':
    case 'MIN_BALANCE':
    case 'MIN_LIMIT':
    case 'OPENING_BALANCE':
      return `$${value}`
    case 'MIN_LVR':
    case 'MAX_LVR':
      const parsedValue = Number(value)

      if (!Number.isNaN(parsedValue)) {
        const percentageValue = (parsedValue * 100)
          .toFixed(2)
          .replace(/\.0+$/, '')
          .replace(/(\.\d*?)0+$/, '$1')
        return `${percentageValue}%`
      }

      return value
    default:
      return value
  }
}

const Constraint = (props) => {
  const {constraintType, additionalInfo, additionalValue, additionalInfoUri} = props.constraint
  const formattedAdditionalValue = formatAdditionalValue(constraintType, additionalValue)
  return (
    <li>
      <div>
        {translateConstraintType(constraintType)}
        {!!formattedAdditionalValue && <span> - {formattedAdditionalValue}</span>}
      </div>
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default Constraint
