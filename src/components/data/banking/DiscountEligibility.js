import React from 'react'
import {translateEligibilityType} from '../../../utils/dict'

const DiscountEligibility = (props) => {
  const {discountEligibilityType, additionalValue, additionalInfo, additionalInfoUri} = props.eligibility
  const additionalInfoDescription = discountEligibilityType === 'OTHER' && <span> - {additionalInfo}</span>
  return (
    <li>
      <div>
        {translateEligibilityType(discountEligibilityType)}
        {
          ( discountEligibilityType === 'MIN_AGE' ||
            discountEligibilityType === 'MAX_AGE' ||
            discountEligibilityType === 'EMPLOYMENT_STATUS' ||
            discountEligibilityType === 'RESIDENCY_STATUS') ?
          <span> - {additionalValue}</span> : additionalInfoDescription
        }
        {
          ( discountEligibilityType === 'PENSION_RECIPIENT' ||
            discountEligibilityType === 'STUDENT') && !!additionalValue &&
          <span> - {additionalValue}</span>
        }
        {(discountEligibilityType === 'MIN_INCOME' || discountEligibilityType === 'MIN_TURNOVER') && <span> - ${additionalValue}</span>}
      </div>
      {!additionalInfoDescription && !!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default DiscountEligibility
