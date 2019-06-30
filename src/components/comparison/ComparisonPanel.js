import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import Typography from '@material-ui/core/Typography'
import {fade} from '@material-ui/core/styles/colorManipulator'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {productDataKeys} from '../../utils/dict'
import {format} from "../../utils/datetime";
import AdditionalInfo from "../data/AdditionalInfo";
import ecomp from "../../utils/enum-comp";
import Bundle from "../data/Bundle";
import Constraint from "../data/Constraint";
import DepositRate from "../data/DepositRate";
import LendingRate from "../data/LendingRate";
import Eligibility from "../data/Eligibility";
import Feature from "../data/Feature";
import Fee from "../data/Fee";

const useStyles = makeStyles(theme => ({
  panel: {
    backgroundColor: fade('#fff', 0.9)
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.typography.pxToRem(20),
  },
  table: {
    maxWidth:'95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

const render = (product, key) => {
  switch (key) {
    case 'description':
    case 'brand':
    case 'brandName':
      return product[key]
    case 'lastUpdated':
    case 'effectiveFrom':
    case 'effectiveTo':
      return !!product[key] ? format(product[key]) : ''
    case 'isTailored':
      return product[key] ? 'Yes' : 'No'
    case 'additionalInformation':
      return <AdditionalInfo additionalInfo={product[key]}/>
    case 'bundles':
      return !!product[key] && product[key].length > 0 &&
        <ul>
            {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((bundle, index) => <Bundle key={index} bundle={bundle}/>)}
        </ul>
    case 'constraints':
      return !!product[key] && product[key].length > 0 &&
        <ul>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((constraint, index) => <Constraint key={index} constraint={constraint}/>)}
        </ul>
    case 'depositRates':
      return !!product[key] && product[key].length > 0 &&
        <ul>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((depositRate, index) => <DepositRate key={index} depositRate={depositRate}/>)}
        </ul>
    case 'lendingRates':
      return !!product[key] && product[key].length > 0 &&
        <ul>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((lendingRate, index) => <LendingRate key={index} lendingRate={lendingRate}/>)}
        </ul>
    case 'eligibilities':
      return !!product[key] && product[key].length > 0 &&
        <ul>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((eligibility, index) =><Eligibility key={index} eligibility={eligibility}/>)}
        </ul>
    case 'features':
      return !!product[key] && product[key].length > 0 &&
        <ul>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((feature, index) => <Feature key={index} feature={feature}/>)}
        </ul>
    case 'fees':
      return !!product[key] && product[key].length > 0 &&
        <ul>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((fee, index) => <Fee key={index} fee={fee}/>)}
        </ul>
    default:
      return ''
  }
}

const ComparisonPanel = (props) => {
  const {dataSources, products} = props
  const classes = useStyles()
  return (
    !!products && products.length > 0 &&
    <ExpansionPanel defaultExpanded className={classes.panel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <CompareArrowsIcon/><Typography style={{paddingLeft: 8}}>Products Comparison</Typography>
        </div>
      </ExpansionPanelSummary>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>''</TableCell>
            {products.map(productData =>
              <TableCell>
                {dataSources[productData.dataSourceIdx].name} - {productData.product.name}
              </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {productDataKeys.map(dataKey => (
            <TableRow key={dataKey.key}>
              <TableCell component="th" scope="row" align="right">
                {dataKey.label}
              </TableCell>
              {products.map(productData =>
                <TableCell>{render(productData.product, dataKey.key)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ExpansionPanel>
  )
}

const mapStateToProps = state => ({
  dataSources: state.dataSources,
  products: state.comparison
})

export default connect(mapStateToProps)(ComparisonPanel)
