import React from 'react'
import DateTime from '../DateTime'
import Duration from '../Duration'
import { connect } from 'react-redux'
import { translateDiscoveryStatus } from '../../../utils/dict'

class StatusOutages extends React.Component {

  render() {
    const { statusDetails, outagesDetails } = this.props
    return (
    <>
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
          <Outage outage={outage} key={index}/>
        )}
        </ul>
      </>
      }
    </>
    )
  }
}

const Outage = props => {
  const { outage } = props
  return (
    <li>
      <div>Outage Time: <DateTime rfc3339={outage.outageTime}/></div>
      {!!outage.duration && <div>Planned Duration: <Duration value={outage.duration}/></div>}
      {!!outage.isPartial && <div>Partial: {outage.isPartial}</div>}
      <div>&laquo;{outage.explanation}&raquo;</div>
    </li>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusOutages)