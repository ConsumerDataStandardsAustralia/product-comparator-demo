import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SubjectIcon from '@material-ui/icons/Subject'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import StatusOutages from './StatusOutages'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { connect } from 'react-redux'
import { normalise } from '../../utils/url'
import { retrieveStatus, retrieveOutages } from '../../store/data'

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

  const refreshStatusOutages = () => {
    const { versionInfo } = props
    props.dataSources.forEach((dataSource, index) => {
      const url = normalise(dataSource.url)
      if (!dataSource.unsaved && dataSource.enabled && !dataSource.deleted) {
        props.retrieveStatus(index, url, versionInfo.xV, versionInfo.xMinV)
        props.retrieveOutages(index, url, versionInfo.xV, versionInfo.xMinV)
      }
    })
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

      <Divider/>

      <ExpansionPanelActions>
        <Tooltip title='Refresh'>
          <Fab size='medium' color='primary' onClick={refreshStatusOutages}>
            <RefreshIcon/>
          </Fab>
        </Tooltip>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

const mapStateToProps = state=>({
  dataSources : state.dataSources,
  savedDataSourcesCount: state.dataSources.filter(dataSource => !dataSource.unsaved && !dataSource.deleted && dataSource.enabled).length,
  versionInfo: state.versionInfo.vHeaders
})

const mapDispatchToProps = {
  retrieveStatus,
  retrieveOutages
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryInfo)