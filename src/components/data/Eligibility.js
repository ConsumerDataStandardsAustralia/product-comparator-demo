import React from 'react'

const Eligibility = (props) => {
  const {eligibility} = props
  return (
    <div>
      <div>{eligibility.eligibilityType}: {eligibility.additionalValue}</div>
      <div>{eligibility.additionalInfo}</div>
      <div>For more info, click <a href={eligibility.additionalInfoUri} target='_blank'>{eligibility.additionalInfoUri}</a></div>
    </div>
  )
}

export default Eligibility
