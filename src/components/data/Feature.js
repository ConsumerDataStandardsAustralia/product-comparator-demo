import React from 'react'

const Feature = (props) => {
  const {feature} = props
  return (
    <div>
      <div>{feature.featureType}: {feature.additionalValue}</div>
      <div>{feature.additionalInfo}</div>
      <div>For more info, click <a href={feature.additionalInfoUri} target='_blank'>{feature.additionalInfoUri}</a></div>
    </div>
  )
}

export default Feature
