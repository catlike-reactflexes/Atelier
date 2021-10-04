import React from 'react';
import StyleThumbnails from './styleThumbnails.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import { FaArrowLeft, FaArrowRight, FaExpand } from 'react-icons/fa';

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
      selectedUrl: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      photos: []
    };
    this.mainImageClick = this.mainImageClick.bind(this);
    this.updatePhotos = this.updatePhotos.bind(this);
  }

  mainImageClick(event) {
    this.props.postTrackInteractions('Main Image', 'Product Image');
    this.props.clickHandler(event);
  }

  updatePhotos(data) {
    this.setState({ photos: data });
  }

  render() {
    return (
      this.props.loaded ?
        <div id="mainProductImageContainer" data-testid="overview-image" style={this.props.expand ? expandedStyle : {}}>
          <FaArrowLeft className={'mainImgLeft'} />
          <img className="blurredImage" src={this.props.mainImg} />
          <img id="mainImg" src={this.props.mainImg} />
          <FaArrowRight className={'mainImgRight'} />
          <FaExpand className={'expandIcon'} onClick={this.mainImageClick}/>
          <StyleThumbnails click={this.props.updateMain} photos={this.props.photos} />
        </div>
      : <div id="mainProductImageContainer" data-testid="overview-image">
          <span>Loading Image</span>
        </div>
    )
  }
}

export default ClickTracker(ProductImage);
