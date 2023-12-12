import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SubjectIcon from '@material-ui/icons/Subject'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import RefreshIcon from '@material-ui/icons/Refresh'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Duration from '../Duration'
import DateTime from '../DateTime'
import { connect } from 'react-redux'
import { retrieveStatus, retrieveOutages } from '../../../store/aemo_discovery'
import { translateDiscoveryStatus } from '../../../utils/dict'

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

const AEMODiscoveryInfo = (props) => {

  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  const {statusDetails, outagesDetails} = props.data

  const toggleExpansion = (event, newExpanded) => {
    setExpanded(newExpanded)
  }

  const refreshStatusOutages = () => {
    props.retrieveStatus()
    props.retrieveOutages()
  }

  React.useEffect(() => {
    refreshStatusOutages()
    // eslint-disable-next-line
  }, [])
    
  return (
    <Accordion defaultExpanded className={classes.panel} expanded={expanded} onChange={toggleExpansion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <SubjectIcon/><Typography style={{paddingLeft: 8}}>Status &amp; Outages</Typography>
        </div>
      </AccordionSummary>
      <div className={classes.details}>
        <p>Secondary Data Holders provide data to Data Holders via CDR requests, who in turn provide the data to ADRs. Such data is called Shared Responsibility Data (SR data).</p>
        <p>Currently, only the energy sector has a designated secondary data holder: AEMO. This page lists the status and outages for AEMO.</p>

        <div className="title"><span><img src="https://www.aemo.com.au/-/media/project/aemo/global/logos/aemo-logo.svg" alt="AEMO"/></span></div>
        {!!statusDetails &&
        <>
          <h4>Status</h4>
          <div style={{fontSize: '0.8rem'}}>
            <div>Status: {translateDiscoveryStatus(statusDetails.status)}{!!statusDetails.explanation && <span> - {statusDetails.explanation}</span>}</div>
            {!!statusDetails.detectionTime && <div>Detection Time: <DateTime rfc3339={statusDetails.detectionTime}/></div>}
            {!!statusDetails.expectedResolutionTime && <div>Expected Resolution Time: <DateTime rfc3339={statusDetails.expectedResolutionTime}/></div>}
            {!!statusDetails.updateTime && <div>Update Time: <DateTime rfc3339={statusDetails.updateTime}/></div>}
          </div>
        </>
        }

        {!!outagesDetails && !!outagesDetails.outages && !!outagesDetails.outages.length &&
        <>
          <h4>Scheduled Outages</h4>
          <ul style={{fontSize: '0.8rem'}}>
          {outagesDetails.outages.map((outage, index) =>
            <li key={index}>
              <div>Outage Time: <DateTime rfc3339={outage.outageTime}/></div>
              {!!outage.duration && <div>Planned Duration: <Duration value={outage.duration}/></div>}
              {!!outage.isPartial && <div>Partial: {outage.isPartial}</div>}
              <div>&laquo;{outage.explanation}&raquo;</div>
            </li>
          )}
          </ul>
        </>
        }
      </div>

      <Divider/>

      <AccordionActions>
        <Tooltip title='Refresh'>
          <Fab size='medium' color='primary' onClick={refreshStatusOutages}>
            <RefreshIcon/>
          </Fab>
        </Tooltip>
      </AccordionActions>
    </Accordion>
  )
}

const mapStateToProps = state => ({
  data: state.aemoDiscovery
})

const mapDispatchToProps = {
  retrieveStatus,
  retrieveOutages
}

export default connect(mapStateToProps, mapDispatchToProps)(AEMODiscoveryInfo)