import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionActions from '@material-ui/core/AccordionActions'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ComputerIcon from '@material-ui/icons/Computer'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import RefreshIcon from '@material-ui/icons/Refresh'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import TreeView from './TreeView'
import { refreshConout, cleanConout } from '../../store/conout/actions'

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
    maxHeight: 300,
    overflow: 'auto',
    marginBottom: 20
  },
  timestamp: {
    color: 'grey',
    paddingRight: 10,
    fontSize: 'smaller'
  }
}))

const ConsolePanel = (props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const toggleExpansion = (event, newExpanded) => {
    setExpanded(newExpanded)
  }

  return (
    <Accordion defaultExpanded={false} className={classes.panel} expanded={expanded} onChange={toggleExpansion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <ComputerIcon/><Typography style={{paddingLeft: 8}}>Console Output</Typography>
        </div>
      </AccordionSummary>
      <div className={classes.details}>
        {props.conout.actions.map((msg, i) =>
          <div key={i}>
            <span className={classes.timestamp}>{moment(msg.timestamp).format('L HH:mm:ss.SSS')}</span>
            <span style={{color: msg.payload.lvl === 'error' ? 'red' : 'black'}}>{msg.payload.txt}</span>
            {msg.payload.obj && <TreeView data={msg.payload.obj}/>}
          </div>
        )}
      </div>
      <Divider/>
      <AccordionActions>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <Tooltip title='Clean'>
              <Fab size='medium' color='secondary' onClick={props.cleanConout}>
                <DeleteIcon/>
              </Fab>
            </Tooltip>
          </Grid>
          <Grid item xs={11} style={{textAlign: 'end'}}>
            <Tooltip title='Synchronise'>
              <Fab size='medium' color='primary' onClick={props.refreshConout}>
                <RefreshIcon/>
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </AccordionActions>
    </Accordion>
  )
}

const mapStateToProps = state => ({
  conout: state.conout
})

const mapDispatchToProps = {refreshConout, cleanConout}

export default connect(mapStateToProps, mapDispatchToProps)(ConsolePanel)
