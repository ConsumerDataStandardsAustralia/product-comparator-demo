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
import { compareProducts } from '../../store/comparison'

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
  const {dataSources, savedDataSourcesCount} = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  const compare = () => {
    props.compareProducts(props.selectedProducts)
    setExpanded(false)
  }
  const toggleExpansion = (event, newExpanded) => {
    setExpanded(newExpanded)
  }
  return (
    <ExpansionPanel defaultExpanded className={classes.panel} expanded={expanded} onChange={toggleExpansion}>
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
        savedDataSourcesCount > 0 &&
        <Grid container alignItems='flex-start' spacing={2} className={classes.container}>
          {dataSources.map((dataSource, index) => (
            dataSource.saved &&
            <Grid item xs={savedDataSourcesCount === 1 ? 12 : 6} key={index} className={classes.item}>
              <ProductList dataSource={dataSource} dataSourceIndex={index}/>
            </Grid>
          ))}
        </Grid>
      }
      </div>
      <Divider/>
      <ExpansionPanelActions>
        <Fab variant='extended' size='medium' color='primary' disabled={props.selectedProducts.length < 2}
             className={classes.button} onClick={compare}>
          <CompareIcon className={classes.leftIcon}/>
          Compare
        </Fab>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

const mapStateToProps = state=>({
  dataSources : state.dataSources,
  savedDataSourcesCount: state.dataSources.filter(dataSource => dataSource.saved).length,
  selectedProducts: state.data.selectedProducts
})

const mapDispatchToProps = { compareProducts }

export default connect(mapStateToProps, mapDispatchToProps)(DataPanel)
