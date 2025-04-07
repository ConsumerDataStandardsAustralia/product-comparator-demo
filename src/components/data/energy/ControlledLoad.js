import React from 'react'
import { makeStyles } from '@material-ui/core'
import DateTime from '../DateTime'
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

const ControlledLoad = ({controlledLoad}) => {
  const classes = useStyles()
  const {displayName, rateBlockUType, startDate, endDate, singleRate, timeOfUseRates} = controlledLoad
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      <div>Rate Type: <span>{rateBlockUType}</span></div>
      {startDate && <div>Start Date: <DateTime rfc3339={startDate} /></div>}
      {endDate && <div>End Date: <DateTime rfc3339={endDate} /></div>}
      {singleRate && (
        <>
          <div className={classes.sectionTitle}>Single Rate:</div>
          <div className={classes.sectionContent}>
            <SingleRate singleRate={singleRate} />
          </div>
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
    </li>
  )
}

export default ControlledLoad
