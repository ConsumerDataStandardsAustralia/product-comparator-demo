import React from 'react'

const Rate = ({rate, defaultUnit = 'KWH'}) => {
  const {unitPrice, measureUnit, volume} = rate
  return (
    <li>
      <div>
        1{measureUnit || defaultUnit}: 
        <span> ${unitPrice} (exclusive of GST)</span>
        {volume && (
          <span> - up to: {volume}{measureUnit || defaultUnit}</span>
        )}
      </div>
    </li>
  )
}

export default Rate
