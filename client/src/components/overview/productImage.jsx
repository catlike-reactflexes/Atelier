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
      selectedUrl: '',
      selectedIndex: this.props.index,
      numPhotos: 5
    };
    this.mainImageClick = this.mainImageClick.bind(this);
    this.makeExpand = this.makeExpand.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.updateNumPhotos = this.updateNumPhotos.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.clickRight = this.clickRight.bind(this);
    this.clickLeft = this.clickLeft.bind(this);
  }

  mainImageClick(event) {
    this.props.postTrackInteractions('Main Image', 'Product Image');
    this.props.clickHandler(event);
  }

  updateSelected(id) {
    this.setState({ selectedIndex: id });
    this.props.updateIndex(id);
  }

  updateNumPhotos(num) {
    this.setState({ numPhotos: num });
  }

  unp = this.updateNumPhotos();

  changeSelection(num) {
    console.log('changeselection num: ', num);
    let currentIndex = this.state.selectedIndex;
    let length = this.state.numPhotos;
    console.log(`currentI: ${currentIndex}, numPhotos: ${length}`)
    if (num === -1 && currentIndex > 0) {
      currentIndex += num;
      this.setState({ selectedIndex: currentIndex });
      this.props.updateIndex(currentIndex);
    } else if ( num === 1 && currentIndex < length - 1) {
      currentIndex += num;
      this.setState({ selectedIndex: currentIndex });
      this.props.updateIndex(currentIndex);
    }
  }

  clickRight(event) {
    this.changeSelection(1);
  }

  clickLeft(event) {
    this.changeSelection(-1);
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
          <FaArrowLeft className={'mainImgLeft'} onClick={this.clickLeft} />
          <img className="blurredImage" src={this.props.mainImg} />
          <img className="mainImg" id={this.props.expand ? 'expandImage' : ''} src={this.props.mainImg} />
          <FaArrowRight className={'mainImgRight'} onClick={this.clickRight}/>
          <FaExpand className={'expandIcon'} onclick={this.mainImageClick}/>
          <StyleThumbnails click={this.props.updateMain} handleUpdate={this.updateSelected} index={this.props.index} photos={this.props.photos} numPhotos={this.updateNumPhotos}/>
          {this.makeExpand(this.props.expand)}
        </div>
      : <div id="mainProductImageContainer" data-testid="overview-image">
          <span>Loading Image</span>
        </div>
    )
  }
}

export default ClickTracker(ProductImage);
