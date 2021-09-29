import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
      this.props.loaded ?
      <div id="detailsContainer" data-testid="overview-details">
        <div className={'overviewStars'}>
          <div>
            <span className={'fullStar'}></span>
            <span className={'fullStar'}></span>
            <span className={'fullStar'}></span>
            <span className={'fullStar'}></span>
            <span className={'fullStar'}></span>
          </div>
          <a onClick={() => {this.props.postTrackInteractions('Read Review Link', 'Product Details')}} href="#">Read all reviews</a>
        </div>
        <span id="po-category">{this.props.category.toUpperCase()}</span>
        <h1 id="po-name">{this.props.name}</h1>
        <span onClick={() => {this.props.postTrackInteractions('Price', 'Product Details')}}>${this.props.price}</span>
      </div>
      :
      <span>product loading</span>
    )
  }
}

export default ClickTracker(ProductDetails);
