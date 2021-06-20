import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ComputerIcon from '@material-ui/icons/Computer'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

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
        {props.conout.map((msg, i) =>
          <div key={i}>
            <span className={classes.timestamp}>{moment(msg.timestamp).format('L HH:mm:ss.SSS')}</span>
            <span style={{color: msg.payload.lvl === 'error' ? 'red' : 'black'}}>{msg.payload.txt}</span>
            {msg.payload.obj && <TreeView data={msg.payload.obj}/>}
          </div>
        )}
      </div>
    </Accordion>
  )
}

const TreeView = ({
  data,
  toggled = false,
  name = null,
  isLast = true,
  isChildElement = false,
  isParentToggled = true
}) => {
  const [isToggled, setIsToggled] = React.useState(toggled)
  const isDataArray = data && Array.isArray(data)
  const plainText = !data || (!isDataArray && (data instanceof Error || typeof data !== 'object'))

  return (
    <div
      className={`tree-element${isParentToggled ? '' : ' collapsed'} ${
        isChildElement ? 'child' : 'parent'
      }`}
    >
      <span
        className={`tree-toggler${isToggled ? ' open' : ''}${plainText ? ' collapsed' : ''}`}
        onClick={() => setIsToggled(!isToggled)}
      />
      {name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>}
      {plainText ? (data ? data + '' : data) :
      <>
        {isDataArray ? '[' : '{'}
        {!isToggled && '...'}
        {Object.keys(data).map((v, i, a) => {
          return typeof data[v] === 'object' ? (
            <TreeView
              key={`${name}-${v}-${i}`}
              data={data[v]}
              isLast={i === a.length - 1}
              name={isDataArray ? null : v}
              isChildElement
              isParentToggled={isParentToggled && isToggled}
            />
          ) : (
            <p
              key={`${name}-${v}-${i}`}
              className={`tree-element${isToggled ? '' : ' collapsed'}`}
            >
              {isDataArray ? '' : <strong>{v}: </strong>}
              <Print val={data[v]}/>
              {i === a.length - 1 ? '' : ','}
            </p>
          )
        })}
        {isDataArray ? ']' : '}'}
      </>
      }
      {!isLast ? ',' : ''}
    </div>
  )
}

const Print = prop => {
  const { val } = prop
  const framing = typeof val === 'string' ? '"' : ''
  return framing + val + framing
}

const mapStateToProps = state => ({
  conout: state.conout
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConsolePanel)
