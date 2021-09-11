import React from 'react';
import ProductImage from './productImage.jsx';
import ProductDetails from './productDetails.jsx';
import ProductSyles from './productStyles.jsx';
import ProductButtons from './productButtons.jsx';
import ProductDescription from './productDescription.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    };
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
