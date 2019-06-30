import React from 'react'
import RateCondition from "./RateCondition";
import {translateRateApplicationMethod, translateUnitOfMeasure} from "../../utils/dict";

const RateSubTier = (props) => {
  const {name, unitOfMeasure, minimumValue, maximumValue, rateApplicationMethod, applicabilityConditions} = props.subTier
  return (
    <div>
      <div>{name}</div>
      <div>Minimum {minimumValue} {translateUnitOfMeasure(unitOfMeasure)}</div>
      {!!maximumValue && <div>Maximum {maximumValue} {translateUnitOfMeasure(unitOfMeasure)}</div>}
      {!!rateApplicationMethod && <div>Applied on {translateRateApplicationMethod(rateApplicationMethod)}</div>}
      {!!applicabilityConditions && <RateCondition rateCondition={applicabilityConditions}/>}
    </div>
  )
}

export default RateSubTier
