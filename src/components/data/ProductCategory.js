import React from 'react'
import Product from './Product'
import {translateProductCategory} from "../../utils/dict";

const strcomp = (a, b) => {
  if ( a < b) return -1
  else if (a === b) return 0
  else return 1
}

const ProductCategory = (props) => {
  const { dataSourceIndex, category, products } = props
  return (
    <div>
      <h4>{translateProductCategory(category)}</h4>
      {products.sort((a,b)=>(strcomp(a.name, b.name))).map(
        (product, index) => <Product key={index} product={product} dataSourceIndex={dataSourceIndex}/>)}
    </div>
  )
}

export default ProductCategory
