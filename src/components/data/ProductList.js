import React from 'react'
import {connect} from 'react-redux'
import {retrieveProductList} from '../../store/data'
import LinearProgress from '@material-ui/core/LinearProgress'
import ProductCategory from './ProductCategory'
import {normalise} from "../../utils/url";

class ProductList extends React.Component {

  componentDidMount() {
    const { dataSourceIndex, dataSource } = this.props
    const { url } = dataSource
    const normalisedUrl = normalise(url)
    const productListUrl = normalisedUrl + '/banking/products'
    this.props.retrieveProductList(dataSourceIndex, normalisedUrl, productListUrl)
  }

  render() {
    const { dataSource, dataSourceIndex } = this.props
    let productList = this.props.data.productList[dataSourceIndex];
    productList = !!productList ? productList : {}
    const { totalRecords, records, products } = productList
    const productsByCategory = {}
    !!products && products.forEach(product => {
      if (product) {
        let productCategory = product.productCategory;
        if (!productsByCategory[productCategory]) {
          productsByCategory[productCategory] = []
        }
        productsByCategory[productCategory].push(product)
      }
    })
    return (
      <div>
        <h2>{dataSource.name}</h2>
        {
          !!totalRecords && (records < totalRecords) &&
          <LinearProgress variant="determinate" value={records * 100 / totalRecords} />
        }
        {
          !!products && records === totalRecords &&
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
