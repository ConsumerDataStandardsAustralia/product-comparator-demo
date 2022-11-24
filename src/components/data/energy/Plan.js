import React from 'react'
import {connect} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import {deselectPlan, selectPlan} from '../../../store/energy/selection'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
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
  const selected = selectedPlans.some(
    selection => (selection.dataSourceIdx === dataSourceIndex && selection.planId === plan.planId))
  const handleChange = event => {
    event.target.checked ? props.selectPlan(dataSourceIndex, plan.planId) : props.deselectPlan(dataSourceIndex, plan.planId)
  }

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
        <div>{plan.displayName}</div>
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
