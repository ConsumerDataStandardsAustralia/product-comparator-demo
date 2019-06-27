import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import {makeStyles} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from "@material-ui/core/Typography"
import Bundle from './Bundle'
import Constraint from "./Constraint"
import DepositRate from './DepositRate'
import LendingRate from './LendingRate'
import Eligibility from './Eligibility'
import Feature from './Feature'
import Fee from './Fee'

const useStyles = makeStyles(theme => ({
  panel: {
    boxShadow: 'none',
    width: 'fit-content',
    maxWidth: '95%',
    backgroundColor: 'transparent'
  },
  details: {
    display: 'block',
    lineHeight: '1.8rem'
  }
}))

const Product = (props) => {
  const classes = useStyles()
  const {product, dataSouceIndex} = props
  return (
    <ExpansionPanel defaultExpanded className={classes.panel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <Typography>{product.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div>{product.description}</div>
        <div>
          Effective from {product.effectiveFrom} to {product.effectiveTo}
        </div>
        <div>
          Last updated at {product.lastUpdated}
        </div>
        <div>To apply, click <a href={product.applicationUri} target='_blank'>{product.applicationUri}</a></div>
        <div>
          <div>Bundles:</div>
          {
            !!product.bundles && product.bundles.map((bundle, index) => (
              <Bundle key={index} bundle={bundle}/>
            ))
          }
        </div>
        <div>
          <div>Constraints:</div>
          {
            !!product.constraints && product.constraints.map((constraint, index) => (
              <Constraint key={index} constraint={constraint}/>
            ))
          }
        </div>
        <div>
          <div>Deposit Rates:</div>
          {
            !!product.depositRates && product.depositRates.map((depositRate, index) => (
              <DepositRate key={index} depositRate={depositRate}/>
            ))
          }
        </div>
        <div>
          <div>Eligibilities:</div>
          {
            !!product.eligibilities && product.eligibilities.map((eligibility, index) => (
              <Eligibility key={index} eligibility={eligibility}/>
            ))
          }
        </div>
        <div>
          <div>Features:</div>
          {
            !!product.features && product.features.map((feature, index) => (
              <Feature key={index} feature={feature}/>
            ))
          }
        </div>
        <div>
          <div>Fees:</div>
          {
            !!product.fees && product.fees.map((fee, index) => (
              <Fee key={index} fee={fee}/>
            ))
          }
        </div>
        <div>
          <div>Lending Rates:</div>
          {
            !!product.lendingRates && product.lendingRates.map((lendingRate, index) => (
              <LendingRate key={index} lendingRate={lendingRate}/>
            ))
          }
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Product
