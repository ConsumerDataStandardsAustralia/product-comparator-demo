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
import {format} from '../../utils/datetime'
import AdditionalInfo from '../data/energy/AdditionalInfo'
import Type from '../data/energy/Type'
import FuelType from '../data/energy/FuelType'
import ExternalLink from '../data/energy/ExternalLink'

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

const render = (plan, key) => {
  switch (key) {
    case 'displayName':
    case 'description':
    case 'brand':
    case 'brandName':
      return plan[key]
    case 'lastUpdated':
    case 'effectiveFrom':
    case 'effectiveTo':
      return !!plan[key] ? format(plan[key]) : ''
    case 'type':
      return <Type type={plan[key]} />
    case 'fuelType':
      return <FuelType fuelType={plan[key]} />
    case 'applicationUri':
      return !!plan[key] && <ExternalLink link={plan[key]}>Apply here</ExternalLink>
    case 'additionalInformation':
      return !!plan[key] && <AdditionalInfo additionalInfo={plan[key]} tableCell/>
    default:
      return ''
  }
}

const EnergyComparisonPanel = (props) => {
  const {dataSources, planSelections} = props
  const classes = useStyles()
  const planDataKeys = [
    {key: 'displayName', label: 'Display Name'},
    {key: 'description', label: 'Description'},
    {key: 'type', label: 'Type'},
    {key: 'fuelType', label: 'Fuel Type'},
    {key: 'brand', label: 'Brand'},
    {key: 'brandName', label: 'Brand Name'},
    {key: 'lastUpdated', label: 'Last Updated'},
    {key: 'effectiveFrom', label: 'Effective From'},
    {key: 'effectiveTo', label: 'Effective To'},
    {key: 'applicationUri', label: 'Application Link'},
    {key: 'additionalInformation', label: 'Additional Information'},
  ]
  
  return (
    !!planSelections && planSelections.length > 0 &&
    <Accordion defaultExpanded className={classes.panel}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <CompareArrowsIcon/><Typography style={{paddingLeft: 8}}>Energy Comparison</Typography>
        </div>
      </AccordionSummary>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell width='16%'/>
            {planSelections.map((selection, index) =>
              <TableCell key={index} className={classes.headCell} width={`${90/planSelections.length}%`}>
                {dataSources[selection.dataSourceIdx].name} - {selection.plan.displayName}
              </TableCell>)}
          </TableRow>
        </TableHead>
      </Table>
      <Table className={classes.table}>
        <TableBody className={classes.dataContainer}>
          {planDataKeys.map(dataKey => (
            <TableRow key={dataKey.key} className={classes.table}>
              <TableCell component='th' scope='row' align='right' className={classes.dataCell} width='16%'>
                {dataKey.label}
              </TableCell>
              {planSelections.map((selection, index) =>
                <TableCell key={index} className={classes.dataCell} width={`${90/planSelections.length}%`}>
                  {render(selection.plan, dataKey.key)}
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
  planSelections: state.energyComparison
})

export default connect(mapStateToProps)(EnergyComparisonPanel)
