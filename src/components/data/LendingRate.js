import React from 'react'
import RateTier from './RateTier'

const LendingRate = (props) => {
  const {lendingRate} = props
  return (
    <div>
      <div>{lendingRate.lendingRateType}</div>
      <div>{lendingRate.rate}</div>
      <div>Calculated {lendingRate.calculationFrequency}</div>
      <div>Applied {lendingRate.applicationFrequency}</div>
      <div>Applied {lendingRate.interestPaymentDue}</div>
      {
        !!lendingRate.tiers && lendingRate.tiers.map((tier, index) => (
          <RateTier key={index} tier={tier}/>
        ))
      }
      <div>Additional Value {lendingRate.additionalValue}</div>
      <div>Additional Info {lendingRate.additionalInfo}</div>
      <div>For more info, click <a href={lendingRate.additionalInfoUri} target='_blank'>{lendingRate.additionalInfoUri}</a></div>
    </div>
  )
}

export default LendingRate
