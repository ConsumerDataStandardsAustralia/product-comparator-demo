import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SubjectIcon from '@material-ui/icons/Subject'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CompareIcon from '@material-ui/icons/Compare'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import EnergyPlanList from './EnergyPlanList'

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: theme.typography.pxToRem(20),
    marginRight: theme.typography.pxToRem(20)
  },
  panel: {
    backgroundColor: fade('#fff', 0.9)
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.typography.pxToRem(20),
  },
  details: {
    maxWidth:'95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  }
}))

const EnergyPanel = (props) => {
  const {dataSources, savedDataSourcesCount} = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  const toggleExpansion = (event, newExpanded) => {
    setExpanded(newExpanded)
  }

  const getWidth = (dataSourceCount, min) => {
    return Math.max(12 / dataSourceCount, min)
  }

  return (
    <Accordion defaultExpanded className={classes.panel} expanded={expanded} onChange={toggleExpansion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <SubjectIcon/><Typography style={{paddingLeft: 8}}>Plans</Typography>
        </div>
      </AccordionSummary>
      <div className={classes.details}>
      {
        savedDataSourcesCount > 0 &&
        <Grid container alignItems='flex-start' spacing={2} className={classes.container}>
          {dataSources.map((dataSource, index) => (
            !dataSource.unsaved && dataSource.enabled && !dataSource.deleted &&
            <Grid item key={index}
                  xs={getWidth(savedDataSourcesCount, 12)}
                  sm={getWidth(savedDataSourcesCount, 12)}
                  md={getWidth(savedDataSourcesCount, 6)}
                  lg={getWidth(savedDataSourcesCount, 4)}
                  xl={getWidth(savedDataSourcesCount, 3)}
            >
              <div className="title">{!!dataSource.icon && <span><img src={dataSource.icon} alt=""/></span>}<h2>{dataSource.name}</h2></div>
              <EnergyPlanList dataSource={dataSource} dataSourceIndex={index}/>
            </Grid>
          ))}
        </Grid>
      }
      </div>
      <Divider/>
      <AccordionActions>
        <Fab variant='extended' size='medium' color='primary'
             disabled={props.selectedPlans.length < 2 || props.selectedPlans.length > 4}
             className={classes.button}>
          <CompareIcon className={classes.leftIcon}/>
          Compare
        </Fab>
      </AccordionActions>
    </Accordion>
  )
}

const mapStateToProps = state=>({
  dataSources : state.dataSources,
  savedDataSourcesCount: state.dataSources.filter(dataSource => !dataSource.unsaved && !dataSource.deleted && dataSource.enabled).length,
  selectedPlans: state.selection
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EnergyPanel)
