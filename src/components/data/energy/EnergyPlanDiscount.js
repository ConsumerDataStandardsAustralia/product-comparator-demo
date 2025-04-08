import React from 'react'
import DateTime from '../DateTime'

const EnergyPlanDiscount = ({discount}) => {
  const {displayName, description, type, category, endDate, methodUType, percentOfBill, percentOfUse, fixedAmount, percentOverThreshold} = discount
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
      <div>Type: <span>{type}</span></div>
      {category && (
        <div>Category: <span>{category}</span></div>
      )}
      {endDate && <div>End Date: <DateTime rfc3339={endDate} /></div>}
      <div>Method: <span>{methodUType}</span></div>
      {percentOfBill && (
        <div>Percent Of Bill: <span>{(percentOfBill.rate * 100).toFixed(2)}%</span></div>
      )}
      {percentOfUse && (
        <div>Percent Of Use: <span>{(percentOfUse.rate * 100).toFixed(2)}%</span></div>
      )}
      {fixedAmount && (
        <div>Fixed Amount: <span>${fixedAmount.amount}</span></div>
      )}
      {percentOverThreshold && (
        <div>Percent Over Threshold (${percentOverThreshold.usageAmount}): <span>{(percentOverThreshold.rate * 100).toFixed(2)}%</span></div>
      )}
    </li>
  )
}

export default EnergyPlanDiscount
