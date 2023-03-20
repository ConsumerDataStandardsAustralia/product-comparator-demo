import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import {
  saveDataSource,
  deleteDataSource,
  enableDataSource,
  modifyDataSourceName,
  modifyDataSourceIcon,
  modifyDataSourceEnergyPrdUrl,
  modifyDataSourceUrl
} from '../../store/data-source'
import { clearSelection} from '../../store/banking/selection'
import { deleteData, clearData } from '../../store/banking/data'
import {connect} from 'react-redux'
import isUrl from '../../utils/url'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import {SnackbarContent} from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Accordion = withStyles({
  root: {
    '&:before': {
      display: 'none'
    },
    boxShadow: 'none',
    '&.Mui-expanded': {
      boxShadow: '0 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
    }
  }
})(MuiAccordion)

const AccordionSummary = withStyles({
  content: {
    margin: 0
  }
})(MuiAccordionSummary)

const AccordionDetails = withStyles({
  root: {
    padding: 0
  }
})(MuiAccordionDetails)

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  snackbar: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldLabel: {
    width: '95%'
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}))

const DataSource = (props) => {

  const classes = useStyles()

  const { dataSource, index } = props

  const [errorState, setErrorState] = React.useState({open: false, errorMessage: ''})

  const handleChange = name => event => {
    if (name === 'name') {
      props.modifyDataSourceName(index, {...dataSource, [name]: event.target.value})
    } else if (name === 'url') {
      props.modifyDataSourceUrl(index, {...dataSource, [name]: event.target.value})
      if (!dataSource.unsaved) {
        props.clearSelection(index)
        props.clearData(index)
      }
    } else if (name === 'energyPrd') {
      props.modifyDataSourceEnergyPrdUrl(index, {...dataSource, [name]: event.target.value})
      if (!dataSource.unsaved) {
        props.clearSelection(index)
        props.clearData(index)
      }
    } else if (name === 'icon') {
      props.modifyDataSourceIcon(index, {...dataSource, [name]: event.target.value})
    } else if (name === 'enabled') {
      props.enableDataSource(index, {...dataSource, [name]: event.target.checked})
      if (dataSource.enabled) {
        props.clearSelection(index)
        props.clearData(index)
      }
    }
  }

  const save = ev => {
    if (!isDataSourceValid()) {
      let message = ''
      if (dataSource.name.trim().length === 0) {
        message = 'Bank name is required. '
      }
      if (!isUrl(dataSource.url)) {
        message += 'URL is invalid.'
      }
      setErrorState({
        open: true,
        errorMessage: message
      })
    } else {
      props.saveDataSource(index, {...dataSource})
    }
    ev.stopPropagation()
    ev.preventDefault()
  }

  const closeErrorMessage = () => {
    setErrorState({...errorState, open: false})
  }

  const del = () => {
    props.deleteDataSource(index)
    props.deleteData(index)
    props.clearSelection(index)
  }

  const isDataSourceValid = () => {
    return dataSource.name.trim().length > 0 && isUrl(dataSource.url)
  }

  const ignore = ev => ev.stopPropagation()

  return (
    <Accordion defaultExpanded={false}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon/>}
      aria-controls='panel1c-content'
    >
    <Grid container spacing={1}>
      <Grid item xs={1}>
      <FormControlLabel
        aria-label="Datasource Enabled"
        onClick={ignore}
        onFocus={ignore}
        control={<Checkbox
          checked={dataSource.enabled}
          onChange={handleChange('enabled')}
        />}
      />
      </Grid>
      <Grid item xs={3}>
        <FormControlLabel className={classes.fieldLabel}
          aria-label="Datasource Name"
          onClick={ignore}
          onFocus={ignore}
          control={<TextField
            error={!dataSource.name.trim().length}
            required={true}
            onChange={handleChange('name')}
            margin='normal'
            placeholder='e.g. Acme Bank'
            value={dataSource.name}
            fullWidth
          />}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel className={classes.fieldLabel}
          aria-label="Datasource URL"
          onClick={ignore}
          onFocus={ignore}
          control={<TextField
            error={!isUrl(dataSource.url)}
            required={true}
            onChange={handleChange('url')}
            placeholder='e.g. https://data.holder'
            value={dataSource.url}
            margin='normal'
            fullWidth
          />}
        />
        <FormControlLabel
          aria-label="Error message"
          onClick={ignore}
          onFocus={ignore}
          control={<Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={errorState.open}
            autoHideDuration={3000}
          >
            <SnackbarContent
              className={classes.snackbar}
              message={<span className={classes.message}><ErrorIcon className={classes.icon}/> {errorState.errorMessage}</span>}
              action={[
                <IconButton key='close' aria-label='Close' color='inherit' onClick={closeErrorMessage}>
                  <CloseIcon className={classes.icon} />
                </IconButton>
              ]}
            />
          </Snackbar>}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControlLabel className={classes.fieldLabel}
          aria-label="Datasource Logo"
          onClick={ignore}
          onFocus={ignore}
          control={<TextField
            error={!!dataSource.icon && !isUrl(dataSource.icon)}
            onChange={handleChange('icon')}
            placeholder='e.g. https://data.holder/images/bank.png'
            value={dataSource.icon}
            margin='normal'
            fullWidth
          />}
        />
      </Grid>
      <Grid item xs={1} className={classes.buttonContainer}>
        { dataSource.unsaved ?
        <FormControlLabel
          aria-label="Save"
          onClick={ignore}
          onFocus={ignore}
          control={<Tooltip title='Save'>
            <IconButton aria-label='Save' className={classes.margin} onClick={save}>
              <DoneOutlineIcon fontSize='large' color={isDataSourceValid() ? 'primary' : 'action'}/>
            </IconButton>
          </Tooltip>}
        /> :
        <FormControlLabel
          aria-label="Delete"
          onClick={ignore}
          onFocus={ignore}
          control={<Tooltip title='Delete'>
            <IconButton aria-label='Delete' className={classes.margin} onClick={del}>
              <DeleteIcon fontSize='large' color='secondary'/>
            </IconButton>
          </Tooltip>}
        />
        }
      </Grid>
    </Grid>
    </AccordionSummary>
    <AccordionDetails>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={11}>
      <TextField
        error={!isUrl(dataSource.energyPrd)}
        required={false}
        onChange={handleChange('energyPrd')}
        placeholder='e.g. https://data.holder'
        value={dataSource.energyPrd}
        margin='normal'
        fullWidth
        label='AER PRD URL (if needed)'
        style={{width: '40%'}}
      />
      </Grid>
    </AccordionDetails>
    </Accordion>
  )
}

const mapDispatchToProps = {
  saveDataSource,
  deleteDataSource,
  enableDataSource,
  modifyDataSourceName,
  modifyDataSourceUrl,
  modifyDataSourceEnergyPrdUrl,
  modifyDataSourceIcon,
  clearSelection,
  deleteData,
  clearData
}

export default connect(null, mapDispatchToProps)(DataSource)
