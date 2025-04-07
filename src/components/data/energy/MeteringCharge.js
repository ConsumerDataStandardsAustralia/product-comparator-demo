import React from 'react'
import Duration from '../Duration'

const MeteringCharge = ({meteringCharge}) => {
  const {displayName, description, minimumValue, maximumValue, period} = meteringCharge
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
      <div>Minimum Value: <span>{minimumValue}</span></div>
      {maximumValue && (
        <div>Maximum Value: <span>{maximumValue}</span></div>
      )}
      {period && (
        <div>Period: <Duration value={period} /></div>
      )}
    </li>
  )
}

export default MeteringCharge
