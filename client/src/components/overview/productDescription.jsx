import React from 'react';

const makeFeatureList = (data) => {
  let items = data.map( obj => {
    let str = `${obj.feature}: ${obj.value}`;
    return <li>{str}</li>
  })
  return <ul className="featureList">{items}</ul>
}

const ProductDescription = (props) => {
  return (
    props.loaded ?
    <div id="productDescription" data-testid="overview-description">
      <span><strong>{props.slogan}</strong></span>
      <p>{props.description}</p>
      {makeFeatureList(props.features)}
    </div>
    : <div id="productDescription" data-testid="overview-description">Loading Product Data</div>
  )
}

export default ProductDescription;
