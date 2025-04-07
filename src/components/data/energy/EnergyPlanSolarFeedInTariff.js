import React from 'react'
import { makeStyles } from '@material-ui/core'
import Rate from './Rate'
import Duration from '../Duration'

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

const EnergyPlanSolarFeedInTariff = ({solarFeedInTariff}) => {
  const classes = useStyles()
  const {displayName, description, startTime, endTime, scheme, payerType, tariffUType, singleTariff, timeVaryingTariffs} = solarFeedInTariff
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
      {startTime && (
        <div>Start Time: <span>{startTime}</span></div>
      )}
      {endTime && (
        <div>End Time: <span>{endTime}</span></div>
      )}
      <div>Scheme: <span>{scheme}</span></div>
      <div>Payer Type: <span>{payerType}</span></div>
      <div>Tariff Type: <span>{tariffUType}</span></div>
      {singleTariff && (
        <div>
          <div className={classes.sectionTitle}>Single Tariff:</div>
          <div>Rates:</div>
            <ul className={classes.sectionContent}>
              {singleTariff.rates.map((rate, index) => <Rate key={index} rate={rate} />)}
            </ul>
            <div>Period: <Duration value={singleTariff.period || 'P1Y'} /></div>
        </div>
      )}
      {timeVaryingTariffs && (
        <>
          <div className={classes.sectionTitle}>Time Varying Tariffs:</div>
          <ul className={classes.sectionContent}>
            {timeVaryingTariffs.map(({type, displayName, rates, period, timeVariations}, index) => (
            <li key={index}>
              {type && (
                <div>Type: <span>{type}</span></div>
              )}
              <div>Display Name: <span>{displayName}</span></div>
              {rates && (
                <>
                  <div className={classes.sectionTitle}>Rates:</div>
                  <ul className={classes.sectionContent}>
                    {rates.map((rate, index) => <Rate key={index} rate={rate} />)}
                  </ul>
                </>
              )}
            <div>Period: <Duration value={period || 'P1Y'} /></div>
              <>
                <div className={classes.sectionTitle}>Time Variations:</div>
                <ul className={classes.sectionContent}>
                  {timeVariations.map(({days, startTime, endTime}, index) => (
                  <li key={index}>
                    <div>Days: <span>{days.join(', ')}</span></div>
                    {startTime && (
                      <div>Start Time: <span>{startTime}</span></div>
                    )}
                    {endTime && (
                      <div>End Time: <span>{endTime}</span></div>
                    )}
                  </li>
                  ))}
                </ul>
              </>
            </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

export default EnergyPlanSolarFeedInTariff
