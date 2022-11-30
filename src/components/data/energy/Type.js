import React from 'react'

const typeDict = {
  STANDING: 'Standing',
  MARKET: 'Market',
  REGULATED: 'Regulated'
}

const Type = ({type}) => (
  <span>{typeDict[type]}</span>
)

export default Type
