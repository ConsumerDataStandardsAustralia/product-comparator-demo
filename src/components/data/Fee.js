import React from 'react'
import FeeDiscount from "./FeeDiscount";

const Fee = (props) => {
  const {fee} = props
  return (
    <div>
      <div>{fee.name}</div>
      <div>{fee.feeType}</div>
      <div>{fee.amount}</div>
      <div>{fee.balanceRate}</div>
      <div>{fee.transactionRate}</div>
      <div>{fee.accruedRate}</div>
      <div>{fee.accrualFrequency}</div>
      <div>{fee.currency}</div>
      <div>{fee.additionalValue}</div>
      <div>{fee.additionalInfo}</div>
      <div>For more info, click <a href={fee.additionalInfoUri} target='_blank'>{fee.additionalInfoUri}</a></div>
      {
        !!fee.discounts && fee.discounts.map((discount, index) =>(
          <FeeDiscount key={index} discount={discount}/>
        ))
      }
    </div>
  )
}

export default Fee
