import React from 'react'
import { makeStyles } from '@material-ui/core'
import Rate from './Rate'
import SingleRate from './SingleRate'
import TimeOfUseRate from './TimeOfUseRate'

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const EnergyPlanTariffPeriod = ({tariffPeriod}) => {
  const classes = useStyles()
  const {type, displayName, startDate, endDate, dailySupplyChargeType, dailySupplyCharge, bandedDailySupplyCharges, timeZone, rateBlockUType, singleRate, timeOfUseRates, demandCharges} = tariffPeriod
  return (
    <li>
      {type && (
        <div>Type: <span>{type}</span></div>
      )}
      <div>Display Name: <span>{displayName}</span></div>
      <div>Start Date: <span>{startDate}</span></div>
      <div>End Date: <span>{endDate}</span></div>
      {dailySupplyChargeType && (
        <div>Daily Supply Charge Type: <span>{dailySupplyChargeType}</span></div>
      )}
      {dailySupplyCharge && (
        <div>Daily Supply Charge: <span>${dailySupplyCharge}</span></div>
      )}
      {bandedDailySupplyCharges && (
        <>
          <div className={classes.sectionTitle}>Banded Daily Supply Charges:</div>
          <ul className={classes.sectionContent}>
            {bandedDailySupplyCharges.map((dailySupplyCharge, index) => <Rate key={index} rate={dailySupplyCharge} defaultUnit="DAYS" />)}
          </ul>
        </>
      )}
      {timeZone && (
        <div>Time Zone: <span>{timeZone}</span></div>
      )}
      <div>Rate Block Type: <span>{rateBlockUType}</span></div>
      {singleRate && (
        <>
          <div className={classes.sectionTitle}>Single Rate:</div>
          <div className={classes.sectionContent}><SingleRate singleRate={singleRate} /></div>
        </>
      )}
      {timeOfUseRates && (
        <>
          <div className={classes.sectionTitle}>Time Of Use Rates:</div>
          <ul className={classes.sectionContent}>
            {timeOfUseRates.map((timeOfUseRate, index) => <TimeOfUseRate timeOfUseRate={timeOfUseRate} key={index} />)}
          </ul>
        </>
      )}
      {demandCharges && (
        <>
          <div className={classes.sectionTitle}>Demand Charges:</div>
          <ul className={classes.sectionContent}>
            {demandCharges.map(({displayName, description, amount, measureUnit, startTime, endTime, days, minDemand, maxDemand, measurementPeriod, chargePeriod}, index) => (
            <li key={index}>
              <div>Display Name: <span>{displayName}</span></div>
              {description && (
                <div>Description: <span>{description}</span></div>
              )}
              <div>Amount: <span>${amount} (exclusive of GST)</span></div>
              {measureUnit && (
                <div>Measure Unit: <span>{measureUnit}</span></div>
              )}
              {startTime && (
                <div>Start Time: <span>{startTime}</span></div>
              )}
              {endTime && (
                <div>End Time: <span>{endTime}</span></div>
              )}
              {days && (
                <div>Days: <span>{days.join(', ')}</span></div>
              )}
              <div>Min Demand: <span>{minDemand || '0.00'}kW</span></div>
              {maxDemand && (
                <div>Max Demand: <span>{maxDemand}kW</span></div>
              )}
              <div>Measurement Period: <span>{measurementPeriod}</span></div>
              <div>Charge Period: <span>{chargePeriod}</span></div>
            </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

export default EnergyPlanTariffPeriod
