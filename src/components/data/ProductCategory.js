import React from 'react'
import Product from './Product'
import {translateProductCategory} from "../../utils/dict";

const ProductCategory = (props) => {
  const { dataSourceIndex, category, products } = props
  return (
    <div>
      <h4>{translateProductCategory(category)}</h4>
      {products.map((product, index) => (<Product key={index} product={product} dataSourceIndex={dataSourceIndex}/>))}
    </div>
  )
}

export default ProductCategory
