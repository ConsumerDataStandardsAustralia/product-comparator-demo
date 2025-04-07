import React from 'react'

const EnergyPlanEligibility = ({eligibility}) => {
  const {type, information, description} = eligibility
  return (
    <li>
      <div>Type: <span>{type}</span></div>
      <div>Information: <span>{information}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
    </li>
  )
}

export default EnergyPlanEligibility
