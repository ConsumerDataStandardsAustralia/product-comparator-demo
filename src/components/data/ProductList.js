import React from 'react'
import {connect} from 'react-redux'
import {START_RETRIEVE_PRODUCT_LIST, startRetrieveProductList, retrieveProductList} from '../../store/data'
import LinearProgress from '@material-ui/core/LinearProgress'
import ProductCategory from './ProductCategory'
import {normalise} from '../../utils/url'

class ProductList extends React.Component {

  componentDidMount() {
    const { dataSourceIndex, dataSource, versionInfo } = this.props
    const { url } = dataSource
    const normalisedUrl = normalise(url)
    const productListUrl = normalisedUrl + '/banking/products'
    this.props.startRetrieveProductList(dataSourceIndex)
    this.props.retrieveProductList(dataSourceIndex, normalisedUrl, productListUrl, versionInfo.xV, versionInfo.xMinV)
  }

  render() {
    const { dataSourceIndex } = this.props
    let productList = this.props.productList[dataSourceIndex];
    productList = !!productList ? productList : {}
    const { progress, totalRecords, detailRecords, failedDetailRecords, products, productDetails } = productList
    const productsByCategory = {}
    const processedRecords = detailRecords + failedDetailRecords
    if (!!totalRecords && totalRecords === processedRecords) {
      const productsMap = {}
      if (failedDetailRecords > 0) {
        products.forEach(product => {productsMap[product.productId] = product})
      }
      !!productDetails && productDetails.forEach(productDetail => {
        if (productDetail) {
          let productCategory = productDetail.productCategory;
          if (!productsByCategory[productCategory]) {
            productsByCategory[productCategory] = []
          }
          productsByCategory[productCategory].push(productDetail)
          delete productsMap[productDetail.productId]
        }
      })
      Object.keys(productsMap).forEach(productId => {
        const product = productsMap[productId]
        let productCategory = product.productCategory;
        if (!productsByCategory[productCategory]) {
          productsByCategory[productCategory] = []
        }
        productsByCategory[productCategory].push(product)
      })
    }

    return (
      <div style={{maxHeight: 300, overflow: 'auto'}}>
        {
          !!totalRecords && (processedRecords < totalRecords) &&
          <LinearProgress variant='determinate' value={processedRecords * 100 / totalRecords} style={{width: '93%'}} />
        }
        {
          progress === START_RETRIEVE_PRODUCT_LIST && <p>Getting all current products...</p>
        }
        {
          processedRecords < totalRecords && <p>Getting product details...</p>
        }
        {
          !!products && processedRecords === totalRecords &&
          Object.keys(productsByCategory).sort().map((category, index) => (
            <ProductCategory key={index} category={category} products={productsByCategory[category]} dataSourceIndex={dataSourceIndex}/>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productList: state.data,
  versionInfo: state.versionInfo
})

const mapDispatchToProps = {startRetrieveProductList, retrieveProductList}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
