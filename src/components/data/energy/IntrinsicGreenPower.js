import React from 'react'

const IntrinsicGreenPower = ({intrinsicGreenPower}) => {
  const {greenPercentage} = intrinsicGreenPower
  return (
    <div>Green Percentage: <span>{(greenPercentage * 100).toFixed(2)}%</span></div>
  )
}

export default IntrinsicGreenPower
