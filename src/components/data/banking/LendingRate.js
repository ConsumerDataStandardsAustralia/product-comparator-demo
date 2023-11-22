import React from 'react'
import RateTier from './RateTier'
import Duration from '../Duration'
import {translateInterestPaymentDue, translateLendingRateType, translateRepaymentType, translateloanPurpose} from '../../../utils/dict'
import ecomp from '../../../utils/enum-comp'
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
      {!!comparisonRate && <div>Comparison rate: {(comparisonRate * 100).toFixed(2)}%</div>}
      <div>
        {translateLendingRateType(lendingRateType)}
        {
          (lendingRateType === 'FIXED' || lendingRateType === 'INTRODUCTORY') && !!additionalValue &&
          <span> - <Duration prefix="every" value={additionalValue}/></span>
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
      {!!calculationFrequency && <div>Calculated <Duration prefix="every" value={calculationFrequency}/></div>}
      {!!applicationFrequency && <div>Applied <Duration prefix="every" value={applicationFrequency}/></div>}
      {!!interestPaymentDue && <div>Interest Payment {translateInterestPaymentDue(interestPaymentDue)}</div>}
      {!!repaymentType && <div>Repayment Type {translateRepaymentType(repaymentType)}</div>}
      {!!loanPurpose && <div>Loan Purpose {translateloanPurpose(loanPurpose)}</div>}
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
