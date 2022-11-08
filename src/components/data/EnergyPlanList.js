import React from 'react'
import {connect} from 'react-redux'
import {START_RETRIEVE_PLAN_LIST, startRetrievePlanList, retrievePlanList} from '../../store/energy/data'
import LinearProgress from '@material-ui/core/LinearProgress'
import {normalise} from '../../utils/url'

class EnergyPlanList extends React.Component {

  componentDidMount() {
    const { dataSourceIndex, dataSource, versionInfo } = this.props
    const { url } = dataSource
    const normalisedUrl = normalise(url)
    const planListUrl = normalisedUrl + '/energy/plans'
    this.props.startRetrievePlanList(dataSourceIndex)
    this.props.retrievePlanList(dataSourceIndex, normalisedUrl, planListUrl, versionInfo.xV, versionInfo.xMinV)
  }

  render() {
    const { dataSourceIndex } = this.props
    let planList = this.props.planList[dataSourceIndex];
    planList = !!planList ? planList : {}
    const { progress, totalRecords, detailRecords, failedDetailRecords, plans, planDetails } = planList
    const processedRecords = detailRecords + failedDetailRecords

    return (
      <div style={{maxHeight: 300, overflow: 'auto'}}>
        {
          !!totalRecords && (processedRecords < totalRecords) &&
          <LinearProgress variant='determinate' value={processedRecords * 100 / totalRecords} style={{width: '93%'}} />
        }
        {
          progress === START_RETRIEVE_PLAN_LIST && <p>Getting all current plans...</p>
        }
        {
          processedRecords < totalRecords && <p>Getting plan details...</p>
        }
        {
          !!plans && processedRecords >= totalRecords &&
          plans.map((plan, index) => (
            <div key={index}>{plan.displayName}</div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  planList: state.energy,
  versionInfo: state.versionInfo.vHeaders
})

const mapDispatchToProps = {startRetrievePlanList, retrievePlanList}

export default connect(mapStateToProps, mapDispatchToProps)(EnergyPlanList)
