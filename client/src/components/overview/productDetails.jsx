import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating
    }
  }

  displayRating(stars) {
    let result = [];
    let counter = 0;
    const classes = {
      '0' : 'emptyStar',
      '0.25' : 'quarterStar',
      '0.50' : 'halfStar',
      '0.75' : 'threeQuarterStar',
      '1' : 'fullStar'
    };
    let wholeNum = Math.floor(stars);
    let remainder = stars - wholeNum;
    for (let i = 0; i < wholeNum; i++) {
      result.push(classes['1']);
      counter++;
    }
    if (remainder > 0) {
      let quarter = (Math.round(remainder * 4) / 4).toFixed(2);
      // console.log(`remainder: ${remainder}, quarter: ${quarter}`);
      // console.log('class quarter: ', classes[quarter])
      result.push(classes[quarter]);
      counter++;
    }
    if (counter < 5) {
      for (let i = counter; i < 5; i++) {
        result.push(classes['0']);
      }
    }
    // console.log('classes: ', result);
    let starList = result.map((star) => {
      return <span className={star}></span>
    })
    return <div>{starList}</div>
  }

  render () {
    return (
      this.props.loaded ?
      <div id="detailsContainer" data-testid="overview-details">
        <div className={'overviewStars'}>
          {this.displayRating(this.props.rating)}
          <a onClick={() => {this.props.postTrackInteractions('Read Review Link', 'Product Details')}} href="">Read all reviews</a>
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
