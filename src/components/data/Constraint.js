import React from 'react'
import {translateConstraintType} from "../../utils/dict";

const Constraint = (props) => {
  const {constraintType, additionalInfo, additionalValue, additionalInfoUri} = props.constraint
  return (
    <li>
      <div>{translateConstraintType(constraintType)} - ${additionalValue}</div>
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default Constraint
