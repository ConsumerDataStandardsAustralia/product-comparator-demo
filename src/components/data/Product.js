import React from 'react'
import {connect} from 'react-redux'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import {makeStyles, withStyles} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Bundle from './Bundle'
import Constraint from './Constraint'
import DepositRate from './DepositRate'
import LendingRate from './LendingRate'
import Eligibility from './Eligibility'
import Feature from './Feature'
import Fee from './Fee'
import Checkbox from '@material-ui/core/Checkbox'
import {deselectProduct, selectProduct} from '../../store/selection'
import DateTime from './DateTime'
import AdditionalInfo from './AdditionalInfo'
import ecomp from '../../utils/enum-comp'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  details: {
    display: 'block',
    lineHeight: '1.8rem',
    paddingRight: 40
  },
  datetime: {
    textDecoration: 'underline'
  },
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 24,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: -1,
    maxHeight: 36,
    minHeight: 24,
    '&$expanded': {
      maxHeight: 36,
      minHeight: 24,
    }
  },
  content: {
    margin: '8px 0',
    '&$expanded': {
      margin: '8px 0',
    },
  },
  expandIcon: {
    paddingTop: 8,
    '&$expanded': {
      paddingTop: 8
    }
  },
  expanded: {},
})(MuiExpansionPanelSummary)

const Product = (props) => {
  const classes = useStyles()
  const {product, dataSourceIndex, selectedProducts} = props
  const selected = selectedProducts.filter(
    prd=>(prd.dataSourceIdx === dataSourceIndex && prd.product.productId === product.productId)).length > 0
  const handleChange = event => {
    event.target.checked ? props.selectProduct(dataSourceIndex, product) : props.deselectProduct(dataSourceIndex, product)
  }
  return (
    <div className={classes.root}>
    <Checkbox
      checked={selected}
      onChange={handleChange}
      color='primary'
    />
    <ExpansionPanel defaultExpanded={false}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <Typography style={{fontSize: '0.8rem'}}>{product.name}</Typography>
      </ExpansionPanelSummary>
      <div style={{fontSize: '0.8rem'}}>
        <div>{product.description}</div>
        <div>Brand: {product.brand} {!!product.bandName && <span>({product.bandName})</span>}</div>
        <div>Last updated at <DateTime rfc3339={product.lastUpdated}/></div>
        <div>{product.isTailored ? 'Tailored' : 'Not Tailored'}</div>
        {!!product.effectiveFrom && <div>Effective from <DateTime rfc3339={product.effectiveFrom}/></div>}
        {!!product.effectiveTo && <div>Effective to <DateTime rfc3339={product.effectiveTo}/></div>}
        {!!product.applicationUri && <div><a href={product.applicationUri} target='_blank' rel='noopener noreferrer'>Apply here</a></div>}
        {
          !!product.additionalInformation &&
          <div>
            <div className={classes.sectionTitle}>Additional Information:</div>
            <AdditionalInfo additionalInfo={product.additionalInformation}/>
          </div>
        }
        {
          !!product.bundles && product.bundles.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Bundles:</div>
            <ul className={classes.sectionContent}>
              {product.bundles.sort((a, b)=>ecomp(a.name, b.name)).map(
                (bundle, index) => <Bundle key={index} bundle={bundle}/>)}
            </ul>
          </div>
        }
        {
          !!product.constraints && product.constraints.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Constraints:</div>
            <ul className={classes.sectionContent}>
              {product.constraints.sort((a, b)=>ecomp(a.constraintType, b.constraintType)).map(
                (constraint, index) => <Constraint key={index} constraint={constraint}/>)}
            </ul>
          </div>
        }
        {
          !!product.depositRates && product.depositRates.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Deposit Rates:</div>
            <ul className={classes.sectionContent}>
              {product.depositRates.sort((a, b)=>ecomp(a.depositRateType, b.depositRateType)).map(
                (depositRate, index) => <DepositRate key={index} depositRate={depositRate}/>)}
            </ul>
          </div>
        }
        {
          !!product.lendingRates && product.lendingRates.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Lending Rates:</div>
            <ul className={classes.sectionContent}>
              {product.lendingRates.sort((a, b)=>ecomp(a.lendingRateType, b.lendingRateType)).map(
                (lendingRate, index) => <LendingRate key={index} lendingRate={lendingRate}/>)}
            </ul>
          </div>
        }
        {
          !!product.eligibility && product.eligibility.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Eligibilities:</div>
            <ul className={classes.sectionContent}>
              {product.eligibility.sort((a, b)=>ecomp(a.eligibilityType, b.eligibilityType)).map(
                (eligibility, index) => <Eligibility key={index} eligibility={eligibility}/>)}
            </ul>
          </div>
        }
        {
          !!product.features && product.features.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Features:</div>
            <ul className={classes.sectionContent}>
              {product.features.sort((a, b)=>ecomp(a.featureType, b.featureType)).map(
                (feature, index) => <Feature key={index} feature={feature}/>)}
            </ul>
          </div>
        }
        {
          !!product.fees && product.fees.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Fees:</div>
            <ul className={classes.sectionContent}>
              {product.fees.sort((a, b)=>ecomp(a.feeType, b.feeType)).map(
                (fee, index) => <Fee key={index} fee={fee}/>)}
            </ul>
          </div>
        }
      </div>
    </ExpansionPanel>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProducts: state.selection
})

const mapDispatchToProps = { selectProduct, deselectProduct }

export default connect(mapStateToProps, mapDispatchToProps)(Product)
