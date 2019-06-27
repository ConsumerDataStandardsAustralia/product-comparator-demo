import React from 'react'

const Product = (props) => {
  const {product, dataSouceIndex} = props
  return (
    <div>
      <div>{product.name}</div>
    </div>
  )
}

export default Product
