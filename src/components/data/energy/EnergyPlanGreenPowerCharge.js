import React from 'react'
import { makeStyles } from '@material-ui/core'

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

const EnergyPlanGreenPowerCharge = ({greenPowerCharge}) => {
  const classes = useStyles()
  const {displayName, description, scheme, type, tiers} = greenPowerCharge
  return (
    <li>
      <div>Display Name: <span>{displayName}</span></div>
      {description && (
        <div>Description: <span>{description}</span></div>
      )}
      <div>Scheme: <span>{scheme}</span></div>
      <div>Type: <span>{type}</span></div>
      <>
        <div className={classes.sectionTitle}>Tiers:</div>
        <ul className={classes.sectionContent}>
        {tiers.map(({percentGreen, rate, amount}, index) => (
          <li key={index}>
            {percentGreen && (
              <div>Percent Green: <span>{(percentGreen * 100).toFixed(2)}%</span></div>
            )}
            {rate && (
              <div>Rate: <span>{(rate * 100).toFixed(2)}%</span></div>
            )}
            {amount && (
              <div>Amount: <span>${amount}</span></div>
            )}
          </li>
        ))}
        </ul>
      </>
    </li>
  )
}

export default EnergyPlanGreenPowerCharge
