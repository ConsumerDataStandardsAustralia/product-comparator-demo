import React from 'react'
import RateCondition from "./RateCondition";

const RateSubTier = (props) => {
  const {subTier} = props
  return (
    <div>
      <div>{subTier.name}</div>
      <div>{subTier.unitOfMeasure}</div>
      <div>{subTier.minimumValue}</div>
      <div>{subTier.maximumValue}</div>
      <div>{subTier.rateApplicationMethod}</div>
      <RateCondition rateCondition={subTier.applicabilityConditions}/>
    </div>
  )
}

export default RateSubTier
