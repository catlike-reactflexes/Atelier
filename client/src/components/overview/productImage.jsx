import React from 'react';
import StyleThumbnails from './styleThumbnails.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const expandedStyle = {
  display: "flex",
  width: "100%",
  height: "75%",
  position: "relative",
  overflow: "hidden"
};

class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    this.mainImageClick = this.mainImageClick.bind(this);
  }

  mainImageClick(event) {
    this.props.postTrackInteractions('Main Image', 'Product Image');
    this.props.clickHandler(event);
  }

  handleChange(event) {
    // update selected style image
  }

  render() {
    return (
      this.props.loaded ?
        <div id="mainProductImageContainer" data-testid="overview-image" style={this.props.expand ? expandedStyle : {}}>
          <img className="blurredImage" src={this.props.photos[this.state.selected].url} />
          <img id="mainImg" src={this.props.photos[this.state.selected].url} onClick={this.mainImageClick}/>
          <StyleThumbnails photos={this.props.photos} />
        </div>
      : <div id="mainProductImageContainer" data-testid="overview-image">
          <span>Loading Image</span>
        </div>
    )
  }
}

export default ClickTracker(ProductImage);
