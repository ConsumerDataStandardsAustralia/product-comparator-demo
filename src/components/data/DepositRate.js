import React from 'react'
import RateTier from './RateTier'

const DepositRate = (props) => {
  const {depositRate} = props
  return (
    <div>
      <div>{depositRate.depositRateType}</div>
      <div>{depositRate.rate}</div>
      <div>Calculated {depositRate.calculationFrequency}</div>
      <div>Applied {depositRate.applicationFrequency}</div>
      {
        !!depositRate.tiers && depositRate.tiers.map((tier, index) => (
          <RateTier key={index} tier={tier}/>
        ))
      }
      <div>Additional Value {depositRate.additionalValue}</div>
      <div>Additional Info {depositRate.additionalInfo}</div>
      <div>For more info, click <a href={depositRate.additionalInfoUri} target='_blank'>{depositRate.additionalInfoUri}</a></div>
    </div>
  )
}

export default DepositRate
