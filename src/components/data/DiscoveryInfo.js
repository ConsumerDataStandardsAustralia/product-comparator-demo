import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SubjectIcon from '@material-ui/icons/Subject'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import StatusOutages from './StatusOutages'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { connect } from 'react-redux'

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
  }
}))

const DiscoveryInfo = (props) => {

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
    <ExpansionPanel defaultExpanded className={classes.panel} expanded={expanded} onChange={toggleExpansion}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <SubjectIcon/><Typography style={{paddingLeft: 8}}>Status &amp; Outages</Typography>
        </div>
      </ExpansionPanelSummary>
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
              <StatusOutages dataSource={dataSource} dataSourceIndex={index}/>
            </Grid>
          ))}
        </Grid>
      }
      </div>
    </ExpansionPanel>
  )
}

const mapStateToProps = state=>({
  dataSources : state.dataSources,
  savedDataSourcesCount: state.dataSources.filter(dataSource => !dataSource.unsaved && !dataSource.deleted && dataSource.enabled).length,
  versionInfo: state.versionInfo
})

export default connect(mapStateToProps)(DiscoveryInfo)