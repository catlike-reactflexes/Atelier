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
      productId: props.id
    };
  }

  componentDidMount() {
    let id = this.state.productId;
    axios({
      method: 'get',
      url: '/product',
      params: { id: id }
    }).then((response) => {
      console.log('Product API get response: ', response);
      data = response.data;
    }).catch((error) => {
      console.log('Error calling procut API: ', error);
    })
  }

  render() {
    return (
      <div id="overview">
        <ProductImage />
        <div className="sidebar column-flex">
          <ProductDetails />
          <ProductSyles />
          <ProductButtons />
        </div>
        <ProductDescription />
      </div>
    );
  }
}

export default Overview;
