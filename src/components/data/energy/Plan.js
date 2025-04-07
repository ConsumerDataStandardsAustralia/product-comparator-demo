import React from 'react'
import {connect} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import DateTime from '../DateTime'
import AdditionalInfo from './AdditionalInfo'
import {deselectPlan, selectPlan} from '../../../store/energy/selection'
import Type from './Type'
import FuelType from './FuelType'
import CustomerType from './CustomerType'
import ExternalLink from './ExternalLink'
import Geography from './Geography'
import PlanContract from './PlanContract'
import MeteringCharge from './MeteringCharge'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
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

const Accordion = withStyles({
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
})(MuiAccordion)

const AccordionSummary = withStyles({
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
  expanded: {}
})(MuiAccordionSummary)

const Plan = (props) => {
  const {plan, dataSourceIndex, selectedPlans} = props
  const classes = useStyles()
  const selected = selectedPlans.some(selection => (selection.dataSourceIdx === dataSourceIndex && selection.plan.planId === plan.planId))
  const handleChange = event => event.target.checked ? props.selectPlan(dataSourceIndex, plan) : props.deselectPlan(dataSourceIndex, plan)
  const blob = new Blob([JSON.stringify(plan, null, 2)], {type : 'application/json'})

  return (
    <div className={classes.root}>  
    <Checkbox
      checked={selected}
      onChange={handleChange}
      color='primary'
    />
    <Accordion defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <Typography style={{fontSize: '0.8rem'}}>{plan.displayName}</Typography>
      </AccordionSummary>
      <div style={{fontSize: '0.8rem'}}>
        <div>{plan.description}</div>
        <div>Brand: {plan.brand} {!!plan.brandName && <span>({plan.brandName})</span>}</div>
        <div>Type: <Type type={plan.type} /></div>
        <div>Fuel Type: <FuelType fuelType={plan.fuelType} /></div>
        <div>Plan ID: {plan.planId}</div>
        <div>Last updated at <DateTime rfc3339={plan.lastUpdated} /> <ExternalLink link={URL.createObjectURL(blob)}>JSON</ExternalLink></div>
        {!!plan.effectiveFrom && <div>Effective from <DateTime rfc3339={plan.effectiveFrom} /></div>}
        {!!plan.effectiveTo && <div>Effective to <DateTime rfc3339={plan.effectiveTo} /></div>}
        {!!plan.applicationUri && <ExternalLink link={plan.applicationUri}>Apply here</ExternalLink>}
        {
          !!plan.additionalInformation &&
          <div>
            <div className={classes.sectionTitle}>Additional Information:</div>
            <AdditionalInfo additionalInfo={plan.additionalInformation} />
          </div>
        }
        {!!plan.customerType && <div>Customer Type: <CustomerType customerType={plan.customerType} /></div>}
        {
          !!plan.geography &&
          <div>
            <div className={classes.sectionTitle}>Geography:</div>
            <div className={classes.sectionContent}>
              <Geography geography={plan.geography} />
            </div>
          </div>
        }
        {
          !!plan.meteringCharges &&
          <div>
            <div className={classes.sectionTitle}>Metering Charges:</div>
            <ul className={classes.sectionContent}>
              {plan.meteringCharges.map((meteringCharge, index) => <MeteringCharge meteringCharge={meteringCharge} key={index} />)}
            </ul>
          </div>
        }
        {
          !!plan.gasContract &&
          <div>
            <div className={classes.sectionTitle}>Gas Contract:</div>
            <div className={classes.sectionContent}>
              <PlanContract contract={plan.gasContract} />
            </div>
          </div>
        }
        {
          !!plan.electricityContract &&
          <div>
            <div className={classes.sectionTitle}>Electricity Contract:</div>
            <div className={classes.sectionContent}>
              <PlanContract contract={plan.electricityContract} />
            </div>
          </div>
        }
      </div>
    </Accordion>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedPlans: state.energySelection
})

const mapDispatchToProps = { selectPlan, deselectPlan }

export default connect(mapStateToProps, mapDispatchToProps)(Plan)
