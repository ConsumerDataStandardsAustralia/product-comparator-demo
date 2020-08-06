import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SyncIcon from '@material-ui/icons/Sync'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PlayListAddIcon from '@material-ui/icons/PlaylistAdd'
import Grid from '@material-ui/core/Grid'
import DataSource from './DataSource'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { loadDataSource, addDataSource, syncDataSources } from '../../store/data-source'
import { loadVersionInfo, saveVersionInfo } from '../../store/version-info'
import { startRetrieveProductList, retrieveProductList } from '../../store/data'
import { clearSelection} from '../../store/selection'
import { clearData } from '../../store/data'
import { normalise } from '../../utils/url'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
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
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },
  version: {
    textAlign: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '20ch'
    },
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  }
})

class DataSourcePanel extends React.Component {

  componentDidMount() {
    this.props.loadDataSource()
    this.props.loadVersionInfo()
  }

  render() {
    const {classes, dataSources, addDataSource, syncDataSources, versionInfo} = this.props
    const versions = [1, 2, 3]

    const handleVersionChange = (xV, xMinV) => {
      this.props.saveVersionInfo({xV: xV, xMinV: xMinV})
      dataSources.forEach((dataSource, dataSourceIndex) => {
        if (!dataSource.unsaved && dataSource.enabled) {
          this.props.clearSelection(dataSourceIndex)
          this.props.clearData(dataSourceIndex)
          this.props.startRetrieveProductList(dataSourceIndex)
          const normalisedUrl = normalise(dataSource.url)
          this.props.retrieveProductList(dataSourceIndex, normalisedUrl, normalisedUrl + '/banking/products', xV, xMinV)
        }
      })
    }

    return (
      <ExpansionPanel defaultExpanded={false} className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls='panel1c-content'
        >
          <div className={classes.heading}>
            <AccountBalanceIcon/><Typography  style={{paddingLeft: 8}}>Banks</Typography>
          </div>
        </ExpansionPanelSummary>
        { dataSources.length > 0 &&
        <div className={classes.details}>
          <Grid container spacing={1} style={{fontSize: 'smaller', fontStyle: 'italic'}}>
            <Grid item xs={1}><span>Enabled</span></Grid>
            <Grid item xs={3}><span>Name</span></Grid>
            <Grid item xs={4}><span>Banking product API base url</span></Grid>
            <Grid item xs={3}><span>Icon url</span></Grid>
          </Grid>
          {dataSources.map((dataSource, index) => <DataSource key={index} dataSource={dataSource} index={index}/>)}
        </div>
        }
        <Divider/>
        <ExpansionPanelActions>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <Tooltip title='Synchronise'>
                <Fab size='medium' color='secondary' onClick={syncDataSources}>
                  <SyncIcon/>
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={10}>
              <div className={classes.version}>
                <TextField
                  id="xV"
                  select
                  label="x-v"
                  value={versionInfo.xV}
                  onChange={event => handleVersionChange(event.target.value, versionInfo.xMinV)}
                  helperText="Preferred version"
                >
                  {versions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="xMinV"
                  select
                  label="x-min-v"
                  value={versionInfo.xMinV}
                  onChange={event => handleVersionChange(versionInfo.xV, event.target.value)}
                  helperText="Minimal acceptable version"
                >
                  {versions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item xs={1} style={{textAlign: 'end'}}>
              <Tooltip title='Add'>
                <Fab size='medium' color='primary' onClick={addDataSource}>
                  <PlayListAddIcon/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = state => ({
  dataSources: state.dataSources,
  versionInfo: state.versionInfo
})

const mapDispatchToProps = {
  loadDataSource,
  addDataSource,
  syncDataSources,
  loadVersionInfo,
  saveVersionInfo,
  startRetrieveProductList,
  retrieveProductList,
  clearSelection,
  clearData
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DataSourcePanel))
