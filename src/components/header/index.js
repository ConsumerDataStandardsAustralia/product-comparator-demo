import React from 'react'
import { makeStyles } from '@material-ui/core'
import logo from './CDS-logo.png'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#202020',
    fontSize: theme.typography.pxToRem(30),
    fontWeight: 'bold'
  }
}))

export default (props) => {
  const classes = useStyles()
  return (
    <div className={classes.header}>
      <img src={logo} alt='CDS logo'/>
      <Typography className={classes.title}>{props.title}</Typography>
    </div>
  )
}
