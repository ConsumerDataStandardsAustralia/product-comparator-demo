import React from 'react'

const Constraint = (props) => {
  const {constraint} = props
  return (
    <div>
      <div>{constraint.constraintType}: {constraint.additionalValue}</div>
      <div>{constraint.additionalInfo}</div>
      <div>For more info, click <a href={constraint.additionalInfoUri} target='_blank'>{constraint.additionalInfoUri}</a></div>
    </div>
  )
}

export default Constraint
