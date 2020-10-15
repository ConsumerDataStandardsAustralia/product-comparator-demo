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
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      alert('The screen size is too small! Please use a bigger screen to compare.')
      return
    }
    props.compareProducts(props.selectedProducts)
    setExpanded(false)
  }
  const toggleExpansion = (event, newExpanded) => {
    setExpanded(newExpanded)
  }

  const getWidth = (dataSourceCount, min) => {
    return Math.max(12 / dataSourceCount, min)
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
            !dataSource.unsaved && dataSource.enabled && !dataSource.deleted &&
            <Grid item key={index}
                  xs={getWidth(savedDataSourcesCount, 12)}
                  sm={getWidth(savedDataSourcesCount, 12)}
                  md={getWidth(savedDataSourcesCount, 6)}
                  lg={getWidth(savedDataSourcesCount, 4)}
                  xl={getWidth(savedDataSourcesCount, 3)}
            >
              <div className="title">{!!dataSource.icon && <span><img src={dataSource.icon} alt=""/></span>}<h2>{dataSource.name}</h2></div>
              <ProductList dataSource={dataSource} dataSourceIndex={index}/>
            </Grid>
          ))}
        </Grid>
      }
      </div>
      <Divider/>
      <ExpansionPanelActions>
        <Fab variant='extended' size='medium' color='primary'
             disabled={props.selectedProducts.length < 2 || props.selectedProducts.length > 4}
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
  savedDataSourcesCount: state.dataSources.filter(dataSource => !dataSource.unsaved && !dataSource.deleted && dataSource.enabled).length,
  selectedProducts: state.selection
})

const mapDispatchToProps = { compareProducts }

export default connect(mapStateToProps, mapDispatchToProps)(DataPanel)
