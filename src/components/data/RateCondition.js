import React from 'react'

const RateCondition = (props) => {
  const {rateCondition} = props
  return (
    <div>
      <div>{rateCondition.additionalInfo}</div>
      <div>For more info, click <a href={rateCondition.additionInfoUri} target='_blank'>{rateCondition.additionInfoUri}</a></div>
    </div>
  )
}

export default RateCondition
