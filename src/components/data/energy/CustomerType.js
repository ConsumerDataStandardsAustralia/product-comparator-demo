import React from 'react'

const customerTypeDict = {
  RESIDENTIAL: 'Residential',
  BUSINESS: 'Business'
}

const CustomerType = ({customerType}) => (
  <span>{customerTypeDict[customerType]}</span>
)

export default CustomerType
