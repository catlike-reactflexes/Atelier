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
    this.makeExpand = this.makeExpand.bind(this);
  }

  mainImageClick(event) {
    this.props.postTrackInteractions('Main Image', 'Product Image');
    this.props.clickHandler(event);
  }

  updatePhotos(data) {
    this.setState({ photos: data });
  }

  makeExpand(flag) {
    let imgUrl = this.state.selectedUrl;
    let imgSource = new Image();
    imgSource.src = imgUrl;
    imgSource.onload = function() {
      let zoomer = document.getElementById('expandImage')
        || document.querySelector('.mainImg');
      let imgWidth = zoomer.naturalWidth;
      let imgHeight = zoomer.naturalHeight;
      let ratio = imgHeight / imgWidth;
      let percent = ratio * 100 + '%';

      function mouseMove(event) {
        let boxWidth = zoomer.clientWidth;
        let boxHeight = zoomer.clientHeight;
        let xPos = event.pageX - this.offsetLeft;
        let yPos = event.pageY - this.offsetTop;
        let xPercent = xPos / (boxWidth / 100) + '%';
        let yPercent = yPos / (boxWidth * ratio / 100) + '%';
        let newTop = -(yPos / (boxWidth / 160)) * ratio;
        let newLeft = -(xPos / (boxWidth / 120)) + 20;

        Object.assign(zoomer.style, {
          top: newTop + 'px',
          left: newLeft + 'px',
          width: imgWidth + 'px',
          height: imgHeight + 'px'
        });
      }

      function mouseLeave(event) {
        Object.assign(zoomer.style, {
          top: 0 + 'px',
          left: 0 + 'px',
          objectPosition: 'center',
          width: 'auto',
          height: 100 + '%'
        });
      }

      if (flag) {

        zoomer.onmousemove = mouseMove;
        zoomer.onmouseleave = mouseLeave;

      } else {
        zoomer.onmousemove = () => {};
        zoomer.onmouseleave = () => {};
      }
    }
  }


  render() {
    return (
      this.props.loaded ?
        <div id="mainProductImageContainer" data-testid="overview-image" style={this.props.expand ? expandedStyle : {}}>
          <FaArrowLeft className={'mainImgLeft'} />
          <img className="blurredImage" src={this.props.mainImg} />
          <img className="mainImg" id={this.props.expand ? 'expandImage' : ''} src={this.props.mainImg} />
          <FaArrowRight className={'mainImgRight'} />
          <FaExpand className={'expandIcon'} onClick={this.mainImageClick}/>
          <StyleThumbnails click={this.props.updateMain} photos={this.props.photos} />
          {this.makeExpand(this.props.expand)}
        </div>
      : <div id="mainProductImageContainer" data-testid="overview-image">
          <span>Loading Image</span>
        </div>
    )
  }
}

export default ClickTracker(ProductImage);
