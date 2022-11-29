import React from 'react'
import {makeStyles} from '@material-ui/core'
import ExternalLink from './ExternalLink'

const useStyles = makeStyles(() => ({
  ul: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  },
  tableCell: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0
  }
}))

const AdditionalInfo = ({tableCell, additionalInfo}) => {
  const {overviewUri, termsUri, eligibilityUri, pricingUri, bundleUri} = additionalInfo
  const classes = useStyles()
  return (
    <ul className={!!tableCell ? classes.tableCell : classes.ul}>
      {!!overviewUri && <li><ExternalLink link={overviewUri}>Overview</ExternalLink></li>}
      {!!termsUri && <li><ExternalLink link={termsUri}>Terms and Conditions</ExternalLink></li>}
      {!!eligibilityUri && <li><ExternalLink link={eligibilityUri}>Eligibility</ExternalLink></li>}
      {!!pricingUri && <li><ExternalLink link={pricingUri}>Pricing</ExternalLink></li>}
      {!!bundleUri && <li><ExternalLink link={bundleUri}>Bundle</ExternalLink></li>}
    </ul>
  )
}

export default AdditionalInfo
