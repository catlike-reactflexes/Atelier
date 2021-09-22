import React from 'react';

const ProductDescription = (props) => {
  return (
    <div id="productDescription" data-testid="overview-description">
      <span><strong>Slogan - Catchphrase - Etc</strong></span>
      <p>Full Description here</p>
      <ul className="featureList">
        <li>Features list</li>
      </ul>
    </div>
  )
}

export default ProductDescription;