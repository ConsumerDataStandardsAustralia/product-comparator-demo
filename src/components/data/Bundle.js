import React from 'react'

const Bundle = (props) => {
  const {bundle} = props
  return (
    <li>
      <div>{bundle.name}</div>
      <div>{bundle.description}</div>
      {!!bundle.additionalInfo && <div>{bundle.additionalInfo}</div>}
      {!!bundle.additionalInfoUri && <div><a href={bundle.additionalInfoUri} target='_blank'>More info</a></div>}
    </li>
  )
}

export default Bundle
