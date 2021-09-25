import React from 'react';
import StyleThumbnails from './styleThumbnails.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  handleChange(event) {
    // update selected style image
  }

  render() {
    return (
      this.props.loaded ?
        <div id="mainProductImageContainer" data-testid="overview-image" >
          <img className="blurredImage" src={this.props.photos[this.state.selected].url} />
          <img id="mainImg" src={this.props.photos[this.state.selected].url} onClick={() => {this.props.postTrackInteractions('Main Image', 'Product Image')}}/>
          <StyleThumbnails photos={this.props.photos} />
        </div>
      : <div id="mainProductImageContainer" data-testid="overview-image">
          <span>Loading Image</span>
        </div>
    )
  }
}

export default ClickTracker(ProductImage);
