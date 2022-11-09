import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
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
import {format} from '../../utils/datetime'
import AdditionalInfo from '../data/banking/AdditionalInfo'
import ecomp from '../../utils/enum-comp'
import Bundle from '../data/banking/Bundle'
import Constraint from '../data/banking/Constraint'
import DepositRate from '../data/banking/DepositRate'
import LendingRate from '../data/banking/LendingRate'
import Eligibility from '../data/banking/Eligibility'
import Feature from '../data/banking/Feature'
import Fee from '../data/banking/Fee'
import CardArt from '../data/banking/CardArt'

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
    width:'95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  headerContainer: {
    width: '100%',
    display: 'table'
  },
  dataContainer: {
    height: 600,
    width: '100%',
    overflow: 'auto',
    display: 'block'
  },
  headCell: {
    color: fade('#000', 0.9),
    fontWeight: 700,
    fontSize: '0.8rem'
  },
  dataCell: {
    verticalAlign: 'top'
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
    case 'applicationUri':
      return !!product[key] && <a href={product[key]} target='_blank' rel='noopener noreferrer'>Apply here</a>
    case 'additionalInformation':
      return !!product[key] && <AdditionalInfo additionalInfo={product[key]} tableCell/>
    case 'bundles':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
            {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((bundle, index) => <Bundle key={index} bundle={bundle}/>)}
        </ul>
    case 'constraints':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((constraint, index) => <Constraint key={index} constraint={constraint}/>)}
        </ul>
    case 'depositRates':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((depositRate, index) => <DepositRate key={index} depositRate={depositRate}/>)}
        </ul>
    case 'lendingRates':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((lendingRate, index) => <LendingRate key={index} lendingRate={lendingRate}/>)}
        </ul>
    case 'eligibility':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((eligibility, index) =><Eligibility key={index} eligibility={eligibility}/>)}
        </ul>
    case 'features':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].sort((a, b)=>ecomp(a.name, b.name)).map((feature, index) => <Feature key={index} feature={feature}/>)}
        </ul>
    case 'fees':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].filter(fee => fee).sort((a, b)=>ecomp(a.name, b.name)).map((fee, index) => <Fee key={index} fee={fee}/>)}
        </ul>
    case 'cardArt':
      return !!product[key] && product[key].length > 0 &&
        <ul style={{margin: 0, padding:0}}>
          {product[key].map((cardArt, index) => <CardArt key={index} cardArt={cardArt}/>)}
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
    <Accordion defaultExpanded className={classes.panel}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <CompareArrowsIcon/><Typography style={{paddingLeft: 8}}>Products Comparison</Typography>
        </div>
      </AccordionSummary>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell width='16%'/>
            {products.map((productData, index) =>
              <TableCell key={index} className={classes.headCell} width={`${90/products.length}%`}>
                {dataSources[productData.dataSourceIdx].name} - {productData.product.name}
              </TableCell>)}
          </TableRow>
        </TableHead>
      </Table>
      <Table className={classes.table}>
        <TableBody className={classes.dataContainer}>
          {productDataKeys.map(dataKey => (
            <TableRow key={dataKey.key} className={classes.table}>
              <TableCell component='th' scope='row' align='right' className={classes.dataCell} width='16%'>
                {dataKey.label}
              </TableCell>
              {products.map((productData, index) =>
                <TableCell key={index} className={classes.dataCell} width={`${90/products.length}%`}>
                  {render(productData.product, dataKey.key)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Accordion>
  )
}

const mapStateToProps = state => ({
  dataSources: state.dataSources,
  products: state.comparison
})

export default connect(mapStateToProps)(ComparisonPanel)
