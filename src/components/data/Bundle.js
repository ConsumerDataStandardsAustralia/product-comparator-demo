import React from 'react'

const Bundle = (props) => {
  const {bundle} = props
  return (
    <div>
      <div>{bundle.name}</div>
      <div>{bundle.description}</div>
      <div>{bundle.additionalInfo}</div>
      <div>For more info, click <a href={bundle.additionalInfoUri} target='_blank'>{bundle.additionalInfoUri}</a></div>
    </div>
  )
}

export default Bundle
