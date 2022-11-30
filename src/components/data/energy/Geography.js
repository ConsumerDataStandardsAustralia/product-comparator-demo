import React from 'react'

const Geography = ({geography}) => {
  const {excludedPostcodes, includedPostcodes, distributors} = geography
  return (
    <>
      {excludedPostcodes && excludedPostcodes.length > 0 && (
        <li><div>Excluded Postcodes:</div> <span>{excludedPostcodes.join(', ')}</span></li>
      )}
      {includedPostcodes && includedPostcodes.length > 0 && (
        <li><div>Included Postcodes:</div> <span>{includedPostcodes.join(', ')}</span></li>
      )}
      <li>
        <div>Distributors:</div>
        <ul>
          {distributors.map((distributor, idx) => <li key={idx}>{distributor}</li>)}
        </ul>
      </li>
    </>
  )
}

export default Geography
