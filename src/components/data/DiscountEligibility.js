import React from 'react'
import {translateEligibilityType} from "../../utils/dict";

const DiscountEligibility = (props) => {
  const {discountEligibilityType, additionalValue, additionalInfo, additionalInfoUri} = props.eligibility
  return (
    <li>
      <div>
        {translateEligibilityType(discountEligibilityType)}
        {discountEligibilityType === 'OTHER' && <span> - {additionalInfo}</span>}
        {
          ( discountEligibilityType === 'MIN_AGE' ||
            discountEligibilityType === 'MAX_AGE' ||
            discountEligibilityType === 'EMPLOYMENT_STATUS' ||
            discountEligibilityType === 'RESIDENCY_STATUS') &&
          <span> - {additionalValue}</span>
        }
        {
          ( discountEligibilityType === 'BUSINESS' ||
            discountEligibilityType === 'PENSION_RECIPIENT' ||
            discountEligibilityType === 'STAFF' ||
            discountEligibilityType === 'STUDENT' ||
            discountEligibilityType === 'NATURAL_PERSON') && !!additionalValue &&
          <span> - {additionalValue}</span>
        }
        {
          ( discountEligibilityType === 'BUSINESS' ||
            discountEligibilityType === 'PENSION_RECIPIENT' ||
            discountEligibilityType === 'STAFF' ||
            discountEligibilityType === 'STUDENT' ||
            discountEligibilityType === 'NATURAL_PERSON') && !!additionalInfo &&
          <div>{additionalInfo}</div>
        }
        {(discountEligibilityType === 'MIN_INCOME' || discountEligibilityType === 'MIN_TURNOVER') && <span> - ${additionalValue}</span>}
      </div>
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default DiscountEligibility
