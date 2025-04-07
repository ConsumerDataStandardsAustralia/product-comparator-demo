import React from 'react'

const EnergyPlanIncentive = ({incentive}) => {
  const {displayName, description, category, eligibility} = incentive
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      <div>Description: <span>{description}</span></div>
      <div>Category: <span>{category}</span></div>
      {eligibility && (
        <div>Eligibility: <span>{eligibility}</span></div>
      )}
    </li>
  )
}

export default EnergyPlanIncentive
