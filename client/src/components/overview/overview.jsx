import React from 'react';
import ProductImage from './productImage.jsx';
import ProductDetails from './productDetails.jsx';
import ProductSyles from './productStyles.jsx';
import ProductButtons from './productButtons.jsx';
import ProductDescription from './productDescription.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.id,
      productData: {},
      loaded: false
    };
  }

  componentDidMount() {
    let id = this.state.productId;
    axios({
      method: 'get',
      url: '/product',
      params: { id: id }
    }).then((response) => {
      let data = response.data;
      this.setState({ productData: data, loaded: true });
    }).catch((error) => {
      console.log('Error calling product API: ', error);
    })
  }

  render() {
    return (
      <div id="overview" data-testid="overview-element">
        <ProductImage />
        <div className="sidebar column-flex">
          <ProductDetails name={this.state.productData.name} category={this.state.productData.category} price={this.state.productData.default_price} loaded={this.state.loaded}/>
          <ProductSyles />
          <ProductButtons />
        </div>
        <ProductDescription />
      </div>
    );
  }
}

export default Overview;
