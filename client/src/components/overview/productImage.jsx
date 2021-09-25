import React from 'react';
import StyleThumbnails from './styleThumbnails.jsx';

const ProductImage = (props) => {
  console.log('ProductImage props.photos: ', props.photos);
  return (
    props.loaded ?
      <div id="mainProductImageContainer" data-testid="overview-image" >
        <img className="blurredImage" src={props.photos[0].url} />
        <img id="mainImg" src={props.photos[0].url} />
        <StyleThumbnails />
      </div>
    : <div id="mainProductImageContainer" data-testid="overview-image">
        <span>Loading Image</span>
      </div>
  )
}

export default ProductImage;
