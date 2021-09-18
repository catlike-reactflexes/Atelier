import React from 'react';
import StyleThumbnails from './styleThumbnails.jsx';

const ProductImage = (props) => {
  return (
    <div id="mainProductImageContainer" data-testid="overview-image">
      <img alt="Product Image" />
      <StyleThumbnails />
    </div>
  )
}

export default ProductImage;
