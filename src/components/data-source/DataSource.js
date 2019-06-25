import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import {
  saveDataSource,
  deleteDataSource,
  modifyDataSource
} from '../../store/data-source'
import {connect} from 'react-redux'
import isUrl from '../../utils/url'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import {SnackbarContent} from '@material-ui/core'


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
  icon: {
    marginRight: theme.spacing(2)
  }
}))

const DataSource = (props) => {

  const classes = useStyles()

  const [errorState, setErrorState] = React.useState({open: false, errorMessage: ''})

  const { dataSource, index } = props

  const handleChange = name => event => {
    props.modifyDataSource(index, {...dataSource, [name]: event.target.value})
  }

  const save = () => {
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
  }

  const closeErrorMessage = () => {
    setErrorState({...errorState, open: false})
  }

  const del = () => {
    props.deleteDataSource(index)
  }

  const isDataSourceValid = () => {
    return dataSource.name.trim().length > 0 && isUrl(dataSource.url)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <TextField
          error={!dataSource.name.trim().length}
          required={true}
          label='Name'
          onChange={handleChange('name')}
          margin='normal'
          placeholder='e.g. Acme Bank'
          value={dataSource.name}
          fullWidth
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          error={!isUrl(dataSource.url)}
          required={true}
          label='Banking product API base url'
          onChange={handleChange('url')}
          placeholder='e.g. https://data.holder/cds-au/v1'
          value={dataSource.url}
          margin='normal'
          fullWidth
        />
        <Snackbar
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
        </Snackbar>
      </Grid>
      <Grid item xs={1} className={classes.buttonContainer}>
        { dataSource.saved ?
          <Tooltip title='Delete'>
            <IconButton aria-label='Delete' className={classes.margin} onClick={del}>
              <DeleteIcon fontSize='large' color='secondary'/>
            </IconButton>
          </Tooltip>:
          <Tooltip title='Save'>
            <IconButton aria-label='Save' className={classes.margin} onClick={save}>
              <DoneOutlineIcon fontSize='large' color={isDataSourceValid() ? 'primary' : 'action'}/>
            </IconButton>
          </Tooltip>
        }
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = { saveDataSource, deleteDataSource, modifyDataSource }

export default connect(null, mapDispatchToProps)(DataSource)
