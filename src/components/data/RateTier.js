import React from 'react'
import RateCondition from "./RateCondition";
import RateSubTier from "./RateSubTier";

const RateTier = (props) => {
  const {tier} = props
  return (
      !!tier &&
    <div>
      <div>{tier.name}</div>
      <div>{tier.unitOfMeasure}</div>
      <div>{tier.minimumValue}</div>
      <div>{tier.maximumValue}</div>
      <div>{tier.rateApplicationMethod}</div>
      <RateCondition rateCondition={tier.rateCondition}/>
      <RateSubTier subTier={tier.subTier}/>
    </div>
  )
}

export default RateTier
