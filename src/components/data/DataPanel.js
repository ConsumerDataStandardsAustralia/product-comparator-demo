import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SubjectIcon from '@material-ui/icons/Subject'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CompareIcon from '@material-ui/icons/Compare'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import ProductList from './ProductList'


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
  item: {
    maxHeight: 400,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  }
}))

const DataPanel = (props) => {
  const {savedDataSources} = props
  const classes = useStyles()
  return (
    <ExpansionPanel defaultExpanded className={classes.panel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <SubjectIcon/><Typography style={{paddingLeft: 8}}>Products</Typography>
        </div>
      </ExpansionPanelSummary>
      <div className={classes.details}>
      {
        savedDataSources.length > 0 &&
        <Grid container alignItems='flex-start' spacing={2} className={classes.container}>
          {savedDataSources.map((dataSource, index) => (
            <Grid item xs={savedDataSources.length === 1 ? 12 : 6} key={index} className={classes.item}>
              <ProductList dataSource={dataSource} dataSourceIndex={index}/>
            </Grid>
          ))}
        </Grid>
      }
      </div>
      <Divider/>
      <ExpansionPanelActions>
        <Fab variant='extended' size='medium' color='primary' disabled={props.selectedProducts.length < 2}
             className={classes.button} onClick={props.addDataSource}>
          <CompareIcon className={classes.leftIcon}/>
          Compare
        </Fab>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

const mapStateToProps = state=>({
  savedDataSources: state.dataSources.filter(dataSource => dataSource.saved),
  selectedProducts: state.data.selectedProducts
})

export default connect(mapStateToProps)(DataPanel)
