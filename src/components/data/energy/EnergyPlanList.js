import React from 'react'
import {connect} from 'react-redux'
import {START_RETRIEVE_PLAN_LIST} from '../../../store/energy/data'
import LinearProgress from '@material-ui/core/LinearProgress'
import Plan from './Plan'

class EnergyPlanList extends React.Component {
  render() {
    const { dataSourceIndex } = this.props
    let planList = this.props.planList[dataSourceIndex];
    planList = !!planList ? planList : {}
    const { progress, totalRecords, detailRecords, failedDetailRecords, plans } = planList
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
          !!plans && processedRecords >= totalRecords && Object.values(plans).map((plan, index) => (
            <Plan key={index} plan={plan} dataSourceIndex={dataSourceIndex} />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  planList: state.energy
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EnergyPlanList)
