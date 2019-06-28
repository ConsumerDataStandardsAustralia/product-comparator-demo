import React from 'react'
import {connect} from 'react-redux'
import {retrieveProductList} from '../../store/data'
import LinearProgress from '@material-ui/core/LinearProgress'
import { RETRIEVE_ALL_PRODUCT_DETAILS } from '../../store/data'
import {fulfilled} from '../../utils/async-actions'
import ProductCategory from './ProductCategory'

class ProductList extends React.Component {

  componentDidMount() {
    const { dataSourceIndex, dataSource } = this.props
    const { url } = dataSource
    this.props.retrieveProductList(dataSourceIndex, url)
  }

  render() {
    const { dataSource, dataSourceIndex } = this.props
    let productList = this.props.data.productList[dataSourceIndex];
    productList = !!productList ? productList : {}
    const { progress, totalRecords, records, products } = productList
    const productsByCategory = {}
    !!products && products.forEach(product => {
      let productCategory = product.productCategory;
      if(!productsByCategory[productCategory]) {
        productsByCategory[productCategory] = []
      }
      productsByCategory[productCategory].push(product)
    })
    console.log('productsByCategory', productsByCategory)
    return (
      <div>
        <h2>{dataSource.name}</h2>
        {
          !!totalRecords && (records < totalRecords) &&
          <LinearProgress variant="determinate" value={records * 100 / totalRecords} />
        }
        {
          progress === fulfilled(RETRIEVE_ALL_PRODUCT_DETAILS) && !!products &&
          Object.keys(productsByCategory).map((category, index) => (
            <ProductCategory key={index} category={category} products={productsByCategory[category]} dataSourceIndex={dataSourceIndex}/>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = {retrieveProductList}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
