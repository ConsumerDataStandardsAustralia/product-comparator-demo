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

const TimeOfUseRate = ({timeOfUseRate}) => {
  const classes = useStyles()
  const {displayName, description, dailySupplyCharge, rates, period, timeOfUse, type} = timeOfUseRate
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
      {dailySupplyCharge && (
        <div>Daily Supply Charge: <span>${dailySupplyCharge} (exclusive of GST)</span></div>
      )}
      <div>
        <div className={classes.sectionTitle}>Rates:</div>
        <ul className={classes.sectionContent}>
          {rates.map((rate, index) => <Rate key={index} rate={rate} />)}
        </ul>
      </div>
      <div>Period: <Duration value={period || 'P1Y'} /></div>
      <div className={classes.sectionTitle}>Time Of Use:</div>
      <ul className={classes.sectionContent}>
        {timeOfUse.map(({days, startTime, endTime, additionalInfo, additionalInfoUri}, index) => (
          <li key={index}>
            {days && (
              <div>Days: <span>{days.join(', ')}</span></div>
            )}
            {startTime && (
              <div>Start Time: <span>{startTime}</span></div>
            )}
            {endTime && (
              <div>End Time: <span>{endTime}</span></div>
            )}
            {additionalInfo && (
              <div>Additional Info: <span>{additionalInfo}</span></div>
            )}
            {additionalInfoUri && (
              <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>
            )}
          </li>
        ))}
      </ul>
      <div>Type: <span>{type}</span></div>
    </li>
  )
}

export default TimeOfUseRate
