import React from 'react'
import FeeDiscount from "./FeeDiscount";
import * as moment from "moment";
import {translateFeeType} from "../../utils/dict";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  sectionContent: {
    marginTop: 0,
    marginBottom: 0
  }
}))

const Fee = (props) => {
  const classes = useStyles()
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
        !!discounts && discounts.length > 0 &&
        <ul className={classes.sectionContent}>
          {discounts.map((discount, index) =><FeeDiscount key={index} discount={discount}/>)}
        </ul>
      }
    </li>
  )
}

export default Fee
