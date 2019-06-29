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
import {deselectProduct, selectProduct} from '../../store/data'
import DateTime from './DateTime';
import AdditionalInfo from "./AdditionalInfo";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  details: {
    display: 'block',
    lineHeight: '1.8rem'
  },
  datetime: {
    textDecoration: 'underline'
  },
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0
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
})(MuiExpansionPanel);

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
    },
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
})(MuiExpansionPanelSummary);

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
        <Typography>{product.name}</Typography>
      </ExpansionPanelSummary>
      <div className={classes.details}>
        <div>{product.description}</div>
        <div>Brand: {product.brand} {!!product.bandName && <span>({product.bandName})</span>}</div>
        <div>Last updated at <DateTime rfc3339={product.lastUpdated}/></div>
        <div>{product.isTailored ? 'Tailored' : 'Not Tailored'}</div>
        {!!product.effectiveFrom && <div>Effective from <DateTime rfc3339={product.effectiveFrom}/></div>}
        {!!product.effectiveTo && <div>Effective to <DateTime rfc3339={product.effectiveTo}/></div>}
        {!!product.applicationUri && <div><a href={product.applicationUri} target='_blank'>Apply here</a></div>}
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
              {product.bundles.map((bundle, index) => <Bundle key={index} bundle={bundle}/>)}
            </ul>
          </div>
        }
        {
          !!product.constraints && product.constraints.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Constraints:</div>
            <ul className={classes.sectionContent}>
              {product.constraints.map((constraint, index) => <Constraint key={index} constraint={constraint}/>)}
            </ul>
          </div>
        }
        {
          !!product.depositRates && product.depositRates.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Deposit Rates:</div>
            <ul className={classes.sectionContent}>
              {product.depositRates.map((depositRate, index) => <DepositRate key={index} depositRate={depositRate}/>)}
            </ul>
          </div>
        }
        {
          !!product.eligibilities && product.eligibilities.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Eligibilities:</div>
            <div className={classes.sectionContent}>
              {product.eligibilities.map((eligibility, index) => <Eligibility key={index} eligibility={eligibility}/>)}
            </div>
          </div>
        }
        {
          !!product.features && product.features.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Features:</div>
            <div className={classes.sectionContent}>
              {product.features.map((feature, index) => <Feature key={index} feature={feature}/>)}
            </div>
          </div>
        }
        {
          !!product.fees && product.fees.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Fees:</div>
            <div className={classes.sectionContent}>
              {product.fees.map((fee, index) => <Fee key={index} fee={fee}/>)}
            </div>
          </div>
        }
        {
          !!product.lendingRates && product.lendingRates.length > 0 &&
          <div>
            <div className={classes.sectionTitle}>Lending Rates:</div>
            {product.lendingRates.map((lendingRate, index) => <LendingRate key={index} lendingRate={lendingRate}/>)}
          </div>
        }
      </div>
    </ExpansionPanel>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProducts: state.data.selectedProducts
})

const mapDispatchToProps = { selectProduct, deselectProduct }

export default connect(mapStateToProps, mapDispatchToProps)(Product)
