import React from 'react'
import RateCondition from './RateCondition'
import RateSubTier from './RateSubTier'
import {translateRateApplicationMethod, translateUnitOfMeasure} from '../../../utils/dict'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    paddingLeft: 20
  }
}))

const RateTier = (props) => {
  const classes = useStyles()
  const {name, unitOfMeasure, minimumValue, maximumValue, rateApplicationMethod, applicabilityConditions, subTier,
    additionalInfo, additionalInfoUri} = props.tier
  return (
    <li>
      <div>{name}</div>
      <div>Minimum {minimumValue} {translateUnitOfMeasure(unitOfMeasure)}</div>
      {!!maximumValue && <div>Maximum {maximumValue} {translateUnitOfMeasure(unitOfMeasure)}</div>}
      {!!rateApplicationMethod && <div>Applied on {translateRateApplicationMethod(rateApplicationMethod)}</div>}
      {!!applicabilityConditions && <RateCondition rateCondition={applicabilityConditions}/>}
      {
        !!subTier &&
        <div>
          <div className={classes.sectionTitle}>Sub Tier: </div>
          <div className={classes.sectionContent}>
            <RateSubTier subTier={subTier}/>
          </div>
        </div>
      }
      {!!additionalInfo && <div>{additionalInfo}</div>}
      {!!additionalInfoUri && <div><a href={additionalInfoUri} target='_blank' rel='noopener noreferrer'>More info</a></div>}
    </li>
  )
}

export default RateTier
