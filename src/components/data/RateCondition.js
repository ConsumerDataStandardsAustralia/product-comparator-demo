import React from 'react'

const RateCondition = (props) => {
  const {additionalInfo, additionalInfoUri} = props.rateCondition
  return (
    <div>
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank'>More info</a></div>}
    </div>
  )
}

export default RateCondition
