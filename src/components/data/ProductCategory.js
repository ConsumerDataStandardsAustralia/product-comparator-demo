import React from 'react'
import Product from './Product'

const ProductCategory = (props) => {
  const { dataSourceIndex, category, products } = props

  return (
    <div>
      <h4>{category}</h4>
      {products.map((product, index) => (<Product key={index} product={product} dataSouceIndex={dataSourceIndex}/>))}
    </div>
  )
}

export default ProductCategory
