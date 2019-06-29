import React from 'react'
import RateTier from './RateTier'
import {translateInterestPaymentDue, translateLendingRateType} from "../../utils/dict";
import * as moment from "moment";

const LendingRate = (props) => {
  const {
    lendingRateType,
    rate,
    calculationFrequency,
    applicationFrequency,
    comparisonRate,
    interestPaymentDue,
    tiers,
    additionalValue,
    additionalInfo,
    additionalInfoUri
  } = props.lendingRate
  return (
    <li>
      <div>{(rate * 100).toFixed(2)}%</div>
      {!!comparisonRate && <div>Comparision rate: {(comparisonRate * 100).toFixed(2)}%</div>}
      <div>
        {translateLendingRateType(lendingRateType)}
        {
          (lendingRateType === 'FIXED' || lendingRateType === 'INTRODUCTORY') && !!additionalValue &&
          <span> {moment.duration(additionalValue).humanize()}</span>
        }
        {
          (lendingRateType === 'DISCOUNT' || lendingRateType === 'PENALTY'
            || lendingRateType === 'FLOATING' || lendingRateType === 'MARKET_LINKED'
            || lendingRateType === 'BUNDLE_DISCOUNT_FIXED' || lendingRateType === 'BUNDLE_DISCOUNT_VARIABLE') &&
          <span> {additionalValue}</span>
        }
      </div>
      {!!calculationFrequency && <div>Calculated {moment.duration(calculationFrequency).humanize(true)}</div>}
      {!!applicationFrequency && <div>Applied {moment.duration(applicationFrequency).humanize(true)}</div>}
      {!!interestPaymentDue && <div>Interest Payment {translateInterestPaymentDue(interestPaymentDue)}</div>}
      {!!tiers && tiers.length > 0 && tiers.map((tier, index) => <RateTier key={index} tier={tier}/>)}
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank'>More info</a></div>}
    </li>
  )
}

export default LendingRate
