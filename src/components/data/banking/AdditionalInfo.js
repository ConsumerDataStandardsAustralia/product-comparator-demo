import React from 'react'
import {makeStyles} from '@material-ui/core'
import AdditionalInformationUris from './AdditionalInformationUris'

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

const AdditionalInfo = (props) => {
  const {tableCell} = props
  const {overviewUri, termsUri, eligibilityUri, feesAndPricingUri, bundleUri,
    additionalOverviewUris, additionalTermsUris, additionalEligibilityUris, additionalFeesAndPricingUris, additionalBundleUris} = props.additionalInfo
  const classes = useStyles()
  return (
    <ul className={!!tableCell ? classes.tableCell : classes.ul}>
      {!!overviewUri && <li><a href={overviewUri} target='_blank' rel='noopener noreferrer'>Overview</a></li>}
      {!!termsUri && <li><a href={termsUri} target='_blank' rel='noopener noreferrer'>Terms</a></li>}
      {!!eligibilityUri && <li><a href={eligibilityUri} target='_blank' rel='noopener noreferrer'>Eligibility</a></li>}
      {!!feesAndPricingUri && <li><a href={feesAndPricingUri} target='_blank' rel='noopener noreferrer'>Fee and Pricing</a></li>}
      {!!bundleUri && <li><a href={bundleUri} target='_blank' rel='noopener noreferrer'>Bundle</a></li>}
      {!!additionalOverviewUris && <AdditionalInformationUris title="Additional Overview URIs" uris={additionalOverviewUris} />}
      {!!additionalTermsUris && <AdditionalInformationUris title="Additional Terms and Conditions URIs" uris={additionalTermsUris} />}
      {!!additionalEligibilityUris && <AdditionalInformationUris title="Additional Eligibility Rules and Criteria URIs" uris={additionalEligibilityUris} />}
      {!!additionalFeesAndPricingUris && <AdditionalInformationUris title="Additional Fees, Pricing, Discounts, Exemptions and Bonuses URIs" uris={additionalFeesAndPricingUris} />}
      {!!additionalBundleUris && <AdditionalInformationUris title="Additional Bundle URIs" uris={additionalBundleUris} />}
    </ul>
  )
}

export default AdditionalInfo
