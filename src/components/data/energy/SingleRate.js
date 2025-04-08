import React from 'react'
import { makeStyles } from '@material-ui/core'
import Rate from './Rate'
import Duration from '../Duration'

const useStyles = makeStyles(() => ({
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const SingleRate = ({singleRate}) => {
  const classes = useStyles()
  const {displayName, description, dailySupplyCharge, generalUnitPrice, rates, period} = singleRate
  return (
    <>
      <div>Display Name: <span>{displayName}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
      {dailySupplyCharge && (
        <div>Daily Supply Charge: <span>${dailySupplyCharge} (exclusive of GST)</span></div>
      )}
      {generalUnitPrice && (
        <div>General Unit Price: <span>${generalUnitPrice} (exclusive of GST)</span></div>
      )}
        <div>Rates:</div>
        <ul className={classes.sectionContent}>
          {rates.map((rate, index) => <Rate key={index} rate={rate} />)}
        </ul>
        <div>Period: <Duration value={period || 'P1Y'} /></div>
    </>
  )
}

export default SingleRate
