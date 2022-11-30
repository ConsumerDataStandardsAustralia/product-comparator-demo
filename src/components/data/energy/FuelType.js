import React from 'react'

const fuelTypeDict = {
  ELECTRICITY: 'Electricity',
  GAS: 'Gas',
  DUAL: 'Dual'
}

const FuelType = ({fuelType}) => (
  <span>{fuelTypeDict[fuelType]}</span>
)

export default FuelType
