import React from 'react'

const EnergyPlanFee = ({fee}) => {
  const {type, term, amount, rate, description} = fee
  return (
    <li>
      <div>Type: <span>{type}</span></div>
      <div>Term: <span>{term}</span></div>
      {amount && (
        <div>Amount: <span>${amount}</span></div>
      )}
      {rate && (
        <div>Rate: <span>{(rate * 100).toFixed(2)}%</span></div>
      )}
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
    </li>
  )
}

export default EnergyPlanFee
