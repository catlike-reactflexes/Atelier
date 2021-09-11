import React from 'react';
import ProductImage from './productImage.jsx';

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
      </div>
    );
  }
}

export default Overview;
