import React from 'react'
import {format} from '../../utils/datetime'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  datetime: {
    textDecoration: 'underline'
  }
}))

const DateTime = ({rfc3339}) => {
  const classes = useStyles()
  return (<span className={classes.datetime}>{format(rfc3339)}</span>)
}

export default DateTime
