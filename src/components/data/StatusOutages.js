import React from 'react'
import DateTime from './DateTime'
import Duration from './Duration'
import { connect } from 'react-redux'
import { normalise } from '../../utils/url'
import { retrieveStatus, retrieveOutages } from '../../store/data'
import { translateDiscoveryStatus } from '../../utils/dict'

class StatusOutages extends React.Component {

  componentDidMount() {    
    const { dataSourceIndex, dataSource, versionInfo } = this.props
    const url = normalise(dataSource.url)
    this.props.retrieveStatus(dataSourceIndex, url, versionInfo.xV, versionInfo.xMinV)
    this.props.retrieveOutages(dataSourceIndex, url, versionInfo.xV, versionInfo.xMinV)
  }

  render() {
    let data = this.props.data[this.props.dataSourceIndex]
    if (!data) {
      return false
    }
    const {statusDetails, outagesDetails} = data
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
          <li><Outage outage={outage} key={index}/></li>
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
      <div>Planned Duration: <Duration value={outage.duration}/>
      </div>
      {!!outage.isPartial && <div>Partial: {outage.isPartial}</div>}
      <div>&laquo;{outage.explanation}&raquo;</div>
    </li>
  )
}
const mapStateToProps = state => ({
  versionInfo: state.versionInfo.vHeaders,
  data: state.data
})

const mapDispatchToProps = {
  retrieveStatus,
  retrieveOutages
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusOutages)