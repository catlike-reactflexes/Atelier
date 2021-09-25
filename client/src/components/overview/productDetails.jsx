import React from 'react';

const ProductDetails = (props) => {
  return (
    props.loaded ?
    <div id="detailsContainer" data-testid="overview-details">
      <div className={'overviewStars'}>
        <div>
          <span className={'fullStar'}></span>
          <span className={'fullStar'}></span>
          <span className={'fullStar'}></span>
          <span className={'fullStar'}></span>
          <span className={'fullStar'}></span>
        </div>
        <a href="#">Read all reviews</a>
      </div>
      <span id="po-category">{props.category.toUpperCase()}</span>
      <h1 id="po-name">{props.name}</h1>
      <span>${props.price}</span>
    </div>
    :
    <span>product loading</span>
  )
}

export default ProductDetails;
