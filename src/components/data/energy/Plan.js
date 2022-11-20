import React from 'react'

const Plan = (props) => {
  const {plan} = props
  return (
    <div>{plan.displayName}</div>
  )
}

export default Plan
