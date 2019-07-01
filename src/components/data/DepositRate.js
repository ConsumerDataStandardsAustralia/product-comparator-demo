import React from 'react'
import RateTier from './RateTier'
import {translateDepositRateType} from "../../utils/dict";
import * as moment from "moment";
import {makeStyles} from "@material-ui/core";
import ecomp from "../../utils/enum-comp";

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20,
    paddingRight: 20
  }
}))

const DepositRate = (props) => {
  const classes = useStyles()
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
          <span> - {moment.duration(additionalValue).humanize().replace('a ', 'every ')}</span>
        }
        {
          ( depositRateType === 'BONUS' ||
            depositRateType === 'BUNDLE_BONUS' ||
            depositRateType === 'FLOATING' ||
            depositRateType === 'MARKET_LINKED') &&
          <span> - {additionalValue}</span>
        }
      </div>
      {!!calculationFrequency && <div>Calculated {moment.duration(calculationFrequency).humanize().replace('a ', 'every ')}</div>}
      {!!applicationFrequency && <div>Applied {moment.duration(applicationFrequency).humanize().replace('a ', 'every ')}</div>}
      {
        !!tiers && tiers.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Rate Tiers:</div>
            <ul className={classes.sectionContent}>
              {tiers.sort((a, b)=>ecomp(a.name, b.name)).map((tier, index) => <RateTier key={index} tier={tier}/>)}
            </ul>
          </div>
      }
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default DepositRate
