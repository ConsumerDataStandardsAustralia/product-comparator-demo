import React from 'react'
import RateTier from './RateTier'
import {translateInterestPaymentDue, translateLendingRateType, translateRepaymentType} from '../../utils/dict'
import * as moment from 'moment'
import ecomp from '../../utils/enum-comp'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const LendingRate = (props) => {
  const classes = useStyles()
  const {
    lendingRateType,
    rate,
    calculationFrequency,
    applicationFrequency,
    comparisonRate,
    interestPaymentDue,
    repaymentType,
    loanPurpose,
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
          <span> - {moment.duration(additionalValue).humanize().replace('a ', 'every ')}</span>
        }
        {
          ( lendingRateType === 'DISCOUNT' ||
            lendingRateType === 'PENALTY' ||
            lendingRateType === 'FLOATING' ||
            lendingRateType === 'MARKET_LINKED' ||
            lendingRateType === 'BUNDLE_DISCOUNT_FIXED' ||
            lendingRateType === 'BUNDLE_DISCOUNT_VARIABLE') &&
          <span> - {additionalValue}</span>
        }
        {
          ( lendingRateType === 'VARIABLE' ||
            lendingRateType === 'PURCHASE' ) && !!additionalValue &&
          <span> - {additionalValue}</span>
        }
      </div>
      {!!calculationFrequency && <div>Calculated {moment.duration(calculationFrequency).humanize().replace('a ', 'every ')}</div>}
      {!!applicationFrequency && <div>Applied {moment.duration(applicationFrequency).humanize().replace('a ', 'every ')}</div>}
      {!!interestPaymentDue && <div>Interest Payment {translateInterestPaymentDue(interestPaymentDue)}</div>}
      {!!repaymentType && <div>Repayment Type {translateRepaymentType(repaymentType)}</div>}
      {!!loanPurpose && <div>Loan Purpose {loanPurpose}</div>}
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

export default LendingRate
