import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const Geography = ({geography}) => {
  const classes = useStyles()
  const {excludedPostcodes, includedPostcodes, distributors} = geography
  return (
    <>
      {excludedPostcodes && excludedPostcodes.length > 0 && (
        <div>Excluded Postcodes: <span>{excludedPostcodes.join(', ')}</span></div>
      )}
      {includedPostcodes && includedPostcodes.length > 0 && (
        <div>Included Postcodes: <span>{includedPostcodes.join(', ')}</span></div>
      )}
      {distributors && (
      <>
        <div>Distributors:</div>
        <ul className={classes.sectionContent}>
          {distributors.map((distributor, idx) => <li key={idx}>{distributor}</li>)}
        </ul>
      </>
      )}
    </>
  )
}

export default Geography
