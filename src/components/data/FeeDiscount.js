import React from 'react'
import DiscountEligibility from "./DiscountEligibility";

const FeeDiscount = (props) => {
  const {discount} = props
  return (
    <div>
      <div>{discount.description}</div>
      <div>{discount.discountType}</div>
      <div>{discount.amount}</div>
      <div>{discount.balanceRate}</div>
      <div>{discount.transactionRate}</div>
      <div>{discount.accruedRate}</div>
      <div>{discount.feeRate}</div>
      <div>{discount.additionalValue}</div>
      <div>{discount.additionalInfo}</div>
      <div>For more info, click <a href={discount.additionalInfoUri} target='_blank'>{discount.additionalInfoUri}</a></div>
      {
        !!discount.eligibility && discount.eligibility.map((discountEligibility, index) =>(
          <DiscountEligibility key={index} eligibility={discountEligibility}/>
        ))
      }
    </div>
  )
}

export default FeeDiscount
