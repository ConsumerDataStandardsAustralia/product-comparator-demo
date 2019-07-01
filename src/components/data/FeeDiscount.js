import React from 'react'
import DiscountEligibility from "./DiscountEligibility";
import {makeStyles} from "@material-ui/core";
import {translateDiscountType} from "../../utils/dict";
import * as moment from "moment";
import ecomp from "../../utils/enum-comp";

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20,
    paddingRight: 20
  }
}))

const FeeDiscount = (props) => {
  const classes = useStyles()
  const {
    description,
    discountType,
    amount,
    balanceRate,
    transactionRate,
    accruedRate,
    feeRate,
    additionalValue,
    additionalInfo,
    additionalInfoUri,
    eligibility
  } = props.discount
  return (
    <li>
      <div>${amount}</div>
      {!!balanceRate && <div>{(balanceRate * 100).toFixed(2)}%}</div>}
      {!!transactionRate && <div>{(transactionRate * 100).toFixed(2)}%}</div>}
      {!!accruedRate && <div>{(accruedRate * 100).toFixed(2)}%}</div>}
      {!!feeRate && <div>{(feeRate * 100).toFixed(2)}%}</div>}
      <div>
        Discount Type - {translateDiscountType(discountType)}
        {
          (discountType === 'BALANCE' ||
            discountType === 'DEPOSITS' ||
            discountType === 'PAYMENTS') &&
          <span> - ${additionalValue}</span>
        }
        {
          discountType === 'FEE_CAP' &&
          <span> - {moment.duration(additionalValue).humanize().replace('a ', 'every ')}</span>
        }
      </div>
      <div>{description}</div>
      {discountType === 'ELIGIBILITY_ONLY' && additionalValue && <div>{additionalValue}</div>}
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
      {
        !!eligibility && eligibility.length > 0 &&
        <div>
          <div className={classes.sectionTitle}>Discount Eligibilities</div>
          <ul className={classes.sectionContent}>
            {eligibility.sort((a, b)=>ecomp(a.discountEligibilityType, b.discountEligibilityType)).map(
              (discountEligibility, index) => <DiscountEligibility key={index} eligibility={discountEligibility}/>)}
          </ul>
        </div>
      }
    </li>
  )
}

export default FeeDiscount
