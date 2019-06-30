import React from 'react'
import FeeDiscount from "./FeeDiscount";
import * as moment from "moment";
import {translateFeeType} from "../../utils/dict";

const Fee = (props) => {
  const {
    name,
    feeType,
    amount,
    balanceRate,
    transactionRate,
    accruedRate,
    accrualFrequency,
    currency,
    additionalValue,
    additionalInfo,
    additionalInfoUri,
    discounts
  } = props.fee
  return (
    <li>
      <div>
        {name}
        {!!amount && <span> - ${amount}</span>}
        {!!balanceRate && <span> - {(balanceRate * 100).toFixed(2)}%</span>}
        {!!transactionRate && <span> - {(transactionRate * 100).toFixed(2)}%</span>}
        {!!accruedRate && <span> - {(accruedRate * 100).toFixed(2)}%</span>}
        {!!accrualFrequency && <span> - {moment.duration(accrualFrequency).humanize().replace('a ', 'every ')}</span>}
      </div>
      <div>
        Fee Type - {translateFeeType(feeType)}
        {feeType === 'PERIODIC' && <span> - {moment.duration(additionalValue).humanize().replace('a ', 'every ')}</span>}

      </div>
      {!!currency && <div>Currency - {currency}</div>}
      {feeType !== 'PERIODIC' && !!additionalValue && <div>{additionalValue}</div>}
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank'>More info</a></div>}
      {
        !!discounts && discounts.length > 0 && discounts.map((discount, index) =>(
          <FeeDiscount key={index} discount={discount}/>
        ))
      }
    </li>
  )
}

export default Fee
