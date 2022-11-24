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
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import EnergyPlanList from './EnergyPlanList'
import {startRetrievePlanList, retrievePlanList, clearData} from '../../../store/energy/data'
import {normalise} from '../../../utils/url'

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
  const {dataSources, savedDataSourcesCount, versionInfo} = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  const [effective, setEffective] = React.useState('ALL')
  const [fuelType, setFuelType] = React.useState('ALL')

  React.useEffect(() => {
    dataSources.forEach((dataSource, dataSourceIndex) => {
      if (isEnergyDataSource(dataSource)) {
        props.startRetrievePlanList(dataSourceIndex)
        props.retrievePlanList(dataSourceIndex, normalise(dataSource.url), versionInfo.xV, versionInfo.xMinV, effective, fuelType)
      }
    })
    return function() {
      dataSources
        .filter(dataSource => isEnergyDataSource(dataSource))
        .forEach((dataSource, dataSourceIndex) => props.clearData(dataSourceIndex))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effective, fuelType, savedDataSourcesCount])

  const getWidth = (dataSourceCount, min) => {
    return Math.max(12 / dataSourceCount, min)
  }

  return (
    <Accordion defaultExpanded className={classes.panel} expanded={expanded} onChange={(e, newExpanded) => setExpanded(newExpanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <SubjectIcon/><Typography style={{paddingLeft: 8}}>Plans</Typography>
        </div>
      </AccordionSummary>
      <Grid container justifyContent="center" alignItems="center" spacing={2} className={classes.container}>
        <Grid item>
          <FormLabel>Effective</FormLabel>
          <RadioGroup row aria-label="effective" name="effective" value={effective} onChange={e => setEffective(e.target.value)}>
            <FormControlLabel value="CURRENT" control={<Radio />} label="Current" />
            <FormControlLabel value="FUTURE" control={<Radio />} label="Future" />
            <FormControlLabel value="ALL" control={<Radio />} label="All" />
          </RadioGroup>
        </Grid>
        <Grid item>
          <FormLabel>Fuel type</FormLabel>
          <RadioGroup row aria-label="fuelType" name="fuelType" value={fuelType} onChange={e => setFuelType(e.target.value)}>
            <FormControlLabel value="ELECTRICITY" control={<Radio />} label="Electricity" />
            <FormControlLabel value="GAS" control={<Radio />} label="Gas" />
            <FormControlLabel value="DUAL" control={<Radio />} label="Dual" />
            <FormControlLabel value="ALL" control={<Radio />} label="All" />
          </RadioGroup>
        </Grid>
      </Grid>
      <div className={classes.details}>
      {
        savedDataSourcesCount > 0 &&
        <Grid container alignItems='flex-start' spacing={2} className={classes.container}>
          {dataSources.map((dataSource, index) => (isEnergyDataSource(dataSource) &&
            <Grid item key={index}
                  xs={getWidth(savedDataSourcesCount, 12)}
                  sm={getWidth(savedDataSourcesCount, 12)}
                  md={getWidth(savedDataSourcesCount, 6)}
                  lg={getWidth(savedDataSourcesCount, 4)}
                  xl={getWidth(savedDataSourcesCount, 3)}
            >
              <div className="title">{!!dataSource.icon && <span><img src={dataSource.icon} alt=""/></span>}<h2>{dataSource.name}</h2></div>
              <EnergyPlanList dataSourceIndex={index} />
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

function isEnergyDataSource(dataSource) {
  return !dataSource.unsaved && !dataSource.deleted && dataSource.enabled && (!dataSource.sectors || dataSource.sectors.includes("energy"))
}

const mapStateToProps = state=>({
  dataSources : state.dataSources,
  savedDataSourcesCount: state.dataSources.filter(dataSource => isEnergyDataSource(dataSource)).length,
  selectedPlans: state.energySelection,
  versionInfo: state.versionInfo.vHeaders
})

const mapDispatchToProps = {startRetrievePlanList, retrievePlanList, clearData}

export default connect(mapStateToProps, mapDispatchToProps)(EnergyPanel)
