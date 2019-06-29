import React from 'react'

const Eligibility = (props) => {
  const {eligibilityType, additionalValue, additionalInfo, additionalInfoUri} = props.eligibility
  return (
    <li>
      <div>
        {eligibilityType}
        {eligibilityType === 'OTHER' && <span> {additionalInfo}</span>}
        {eligibilityType === 'MIN_AGE' && <span> {additionalValue}</span>}
        {eligibilityType === 'MAX_AGE' && <span> {additionalValue}</span>}
        {eligibilityType === 'EMPLOYMENT_STATUS' && <span> {additionalValue}</span>}
        {eligibilityType === 'RESIDENCY_STATUS' && <span> {additionalValue}</span>}
        {eligibilityType === 'MIN_INCOME' && <span> ${additionalValue}</span>}
        {eligibilityType === 'MIN_TURNOVER' && <span> ${additionalValue}</span>}
      </div>
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank'>More info</a></div>}
    </li>
  )
}

export default Eligibility
