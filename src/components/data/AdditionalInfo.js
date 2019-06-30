import React from "react"
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  ul: {
    marginTop: 0,
    marginBottom: 0
  }
}))

const AdditionalInfo = (props) => {
  const {overviewUri, termsUri, eligibilityUri, feesAndPricingUri, bundleUri} = props.additionalInfo
  const classes = useStyles()
  return (
    <ul className={classes.ul}>
      {!!overviewUri && <li><a href={overviewUri} target='_blank' rel="noopener noreferrer">Overview</a></li>}
      {!!termsUri && <li><a href={termsUri} target='_blank' rel="noopener noreferrer">Terms</a></li>}
      {!!eligibilityUri && <li><a href={eligibilityUri} target='_blank' rel="noopener noreferrer">Eligibility</a></li>}
      {!!feesAndPricingUri && <li><a href={feesAndPricingUri} target='_blank' rel="noopener noreferrer">Fee and Pricing</a></li>}
      {!!bundleUri && <li><a href={bundleUri} target='_blank' rel="noopener noreferrer">Bundle</a></li>}
    </ul>
  )
}

export default AdditionalInfo
