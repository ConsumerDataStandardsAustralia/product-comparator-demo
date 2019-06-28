import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import Typography from '@material-ui/core/Typography'
import {fade} from '@material-ui/core/styles/colorManipulator'


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
        maxWidth: 800,
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

const ComparisonPanel = (props) => {
    const {savedDataSources, selectedProducts} = props
    const classes = useStyles()
    return (
        <ExpansionPanel defaultExpanded className={classes.panel}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls='panel1c-content'
            >
                <div className={classes.heading}>
                    <CompareArrowsIcon/><Typography style={{paddingLeft: 8}}>Products Comparison</Typography>
                </div>
            </ExpansionPanelSummary>

        </ExpansionPanel>
    )
}

const mapStateToProps = state=>({
    savedDataSources: state.dataSources.filter(dataSource => dataSource.saved),
    selectedProducts: state.data.selectedProducts
})

export default connect(mapStateToProps)(ComparisonPanel)
