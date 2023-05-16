import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SyncIcon from '@material-ui/icons/Sync'
import EditIcon from '@material-ui/icons/Edit'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import IconButton from '@material-ui/core/IconButton'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PlayListAddIcon from '@material-ui/icons/PlaylistAdd'
import Grid from '@material-ui/core/Grid'
import DataSource from './DataSource'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { loadDataSource, addDataSource, syncDataSources } from '../../store/data-source'
import { loadVersionInfo, saveVersionInfo, setVersionsEditable, setVersionsReadOnly } from '../../store/version-info'
import { startRetrieveProductList, retrieveProductList, clearData } from '../../store/banking/data'
import { clearSelection} from '../../store/banking/selection'
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
    const {classes, dataSources, addDataSource, syncDataSources, vHeaders} = this.props
    const versions = ['1', '2', '3', '4']
    let {xV, xMinV} = vHeaders

    const updateVersions = () => {
      if (xV && xMinV && (xV !== vHeaders.xV || xMinV !== vHeaders.xMinV)) {
        this.props.saveVersionInfo({xV, xMinV})
        dataSources.forEach((dataSource, dataSourceIndex) => {
          if (!dataSource.unsaved && !dataSource.deleted && dataSource.enabled) {
            this.props.clearSelection(dataSourceIndex)
            this.props.clearData(dataSourceIndex)
            this.props.startRetrieveProductList(dataSourceIndex)
            const normalisedUrl = normalise(dataSource.url)
            this.props.retrieveProductList(dataSourceIndex, normalisedUrl, normalisedUrl + '/banking/products', xV, xMinV)
          }
        })
      } else {
        this.props.setVersionsReadOnly()
      }
    }

    return (
      <Accordion defaultExpanded={false} className={classes.panel}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls='panel1c-content'
        >
          <div className={classes.heading}>
            <AccountBalanceIcon/><Typography style={{paddingLeft: 8}}>Data sources</Typography>
          </div>
        </AccordionSummary>
        <div style={{maxHeight: 300, overflow: 'auto'}}>
          { dataSources.length > 0 &&
          <div className={classes.details}>
            <Grid container spacing={1} style={{fontSize: 'smaller', fontStyle: 'italic', paddingRight: 60}}>
              <Grid item xs={1}><span>Enabled</span></Grid>
              <Grid item xs={3}><span>Name</span></Grid>
              <Grid item xs={4}><span>API base url</span></Grid>
              <Grid item xs={3}><span>Icon url</span></Grid>
            </Grid>
            {dataSources.map((dataSource, index) =>
              !dataSource.deleted && <DataSource key={index} dataSource={dataSource} index={index}/>)}
          </div>
          }
        </div>
        <Divider/>
        <AccordionActions>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <Tooltip title='Synchronise'>
                <Fab size='medium' color='secondary' onClick={syncDataSources}>
                  <SyncIcon/>
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={10}>
              {this.props.readOnly ?
              <div className={classes.version}>
                <TextField value={xV} label="x-v" helperText="Preferred version"  inputProps={{readOnly: true}} />
                <TextField value={xMinV} label="x-min-v" helperText="Minimal acceptable version"  inputProps={{readOnly: true}} />
                <IconButton color="primary" style={{marginTop: 20}} onClick={this.props.setVersionsEditable}>
                  <Tooltip title="Change x-v, x-min-v">
                    <EditIcon />
                  </Tooltip>
                </IconButton>
              </div>
              :
              <div className={classes.version}>
                <Autocomplete
                  id="xV"
                  freeSolo
                  options={versions}
                  value={xV}
                  renderInput={params => (
                    <TextField {...params} label="x-v" helperText="Preferred version"/>
                  )}
                  onInputChange={(ev, value) => xV = value}
                  style={{display: 'inline'}}
                />
                <Autocomplete
                  id="xMinV"
                  freeSolo
                  options={versions}
                  value={xMinV}
                  renderInput={params => (
                    <TextField {...params} label="x-min-v" helperText="Minimal acceptable version"/>
                  )}
                  onInputChange={(ev, value) => xMinV = value}
                  style={{display: 'inline'}}
                />
                <IconButton color="primary" style={{marginTop: 20}} onClick={updateVersions}>
                  <Tooltip title="Apply x-v, x-min-v">
                    <DoneOutlineIcon />
                  </Tooltip>
                </IconButton>
              </div>
              }
            </Grid>
            <Grid item xs={1} style={{textAlign: 'end'}}>
              <Tooltip title='Add'>
                <Fab size='medium' color='primary' onClick={addDataSource}>
                  <PlayListAddIcon/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </AccordionActions>
      </Accordion>
    )
  }
}

const mapStateToProps = state => ({
  dataSources: state.dataSources,
  vHeaders: state.versionInfo.vHeaders,
  readOnly: !state.versionInfo.editable
})

const mapDispatchToProps = {
  loadDataSource,
  addDataSource,
  syncDataSources,
  loadVersionInfo,
  saveVersionInfo,
  setVersionsEditable,
  setVersionsReadOnly,
  startRetrieveProductList,
  retrieveProductList,
  clearSelection,
  clearData
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DataSourcePanel))
