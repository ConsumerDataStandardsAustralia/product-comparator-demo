import React from 'react'
import RateTier from './RateTier'
import {translateDepositRateType} from "../../utils/dict";
import * as moment from "moment";

const DepositRate = (props) => {
  const {
    rate,
    depositRateType,
    calculationFrequency,
    applicationFrequency,
    tiers,
    additionalValue,
    additionalInfo,
    additionalInfoUri
  } = props.depositRate
  return (
    <li>
      <div>{(rate * 100).toFixed(2)}%</div>
      <div>
        {translateDepositRateType(depositRateType)}
        {
          (depositRateType === 'FIXED' || depositRateType === 'INTRODUCTORY') && !!additionalValue &&
          <span> {moment.duration(additionalValue).humanize()}</span>
        }
        {
          (depositRateType === 'BONUS' || depositRateType === 'BUNDLE_BONUS' || depositRateType === 'FLOATING' || depositRateType === 'MARKET_LINKED') &&
          <span> {additionalValue}</span>
        }
      </div>
      {!!calculationFrequency && <div>Calculated {moment.duration(calculationFrequency).humanize(true)}</div>}
      {!!applicationFrequency && <div>Applied {moment.duration(applicationFrequency).humanize(true)}</div>}
      {!!tiers && tiers.length > 0 && tiers.map((tier, index) => <RateTier key={index} tier={tier}/>)}
      {!!additionalInfo && <div>Additional Info {additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank'>More info</a></div>}
    </li>
  )
}

export default DepositRate
