import React from 'react'
import {translateEligibilityType} from "../../utils/dict";

const Eligibility = (props) => {
  const {eligibilityType, additionalValue, additionalInfo, additionalInfoUri} = props.eligibility
  return (
    <li>
      <div>
        {translateEligibilityType(eligibilityType)}
        {eligibilityType === 'OTHER' && <span> - {additionalInfo}</span>}
        {
          ( eligibilityType === 'MIN_AGE' ||
            eligibilityType === 'MAX_AGE' ||
            eligibilityType === 'EMPLOYMENT_STATUS' ||
            eligibilityType === 'RESIDENCY_STATUS') &&
          <span> - {additionalValue}</span>
        }
        {
          ( eligibilityType === 'BUSINESS' ||
            eligibilityType === 'PENSION_RECIPIENT' ||
            eligibilityType === 'STAFF' ||
            eligibilityType === 'STUDENT' ||
            eligibilityType === 'NATURAL_PERSON') && !!additionalValue &&
          <span> - {additionalValue}</span>
        }
        {
          ( eligibilityType === 'BUSINESS' ||
            eligibilityType === 'PENSION_RECIPIENT' ||
            eligibilityType === 'STAFF' ||
            eligibilityType === 'STUDENT' ||
            eligibilityType === 'NATURAL_PERSON') && !!additionalInfo &&
          <div>{additionalInfo}</div>
        }
        {(eligibilityType === 'MIN_INCOME' || eligibilityType === 'MIN_TURNOVER') && <span> - ${additionalValue}</span>}
      </div>
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default Eligibility
