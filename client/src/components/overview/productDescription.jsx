import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const makeFeatureList = (data, tracker) => {
  let items = data.map((obj, index) => {
    let str = `${obj.feature}: ${obj.value}`;
    return <li key={index}>{str}</li>
  })
  return <ul onClick={() => {tracker('Feature List', 'Product Description')}} className="featureList">{items}</ul>
}

const ProductDescription = (props) => {
  return (
    props.loaded ?
    <div id="productDescription" data-testid="overview-description">
      <span><strong>{props.slogan}</strong></span>
      <p>{props.description}</p>
      {makeFeatureList(props.features, props.postTrackInteractions)}
    </div>
    : <div id="productDescription" data-testid="overview-description">Loading Product Data</div>
  )
}

export default ClickTracker(ProductDescription);
