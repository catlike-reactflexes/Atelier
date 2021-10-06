import React from 'react';
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import { FaStar } from 'react-icons/fa';

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5
    }
    this.getRatingForRelated = this.getRatingForRelated.bind(this);
  }

  getRatingForRelated() {
    axios.get('/reviewratings', {
      params: {
        productID: this.props.id,
        count: 100
      }
    })
      .then(arrayOfReviews => {
        let sum = 0
        for (var i = 0; i < arrayOfReviews.data.results.length; i++) {
          sum = sum + arrayOfReviews.data.results[i].rating;
        }
        let average = sum / arrayOfReviews.data.results.length;
        this.setState({
          rating: average
        })
      })
      .catch(error => {
        console.log('get error', error);
        throw error
      })
  }

  componentDidMount() {
    this.getRatingForRelated();
  }
  displayRating(stars) {
    let result = [];
    let counter = 0;
    const classes = {
      '0.00': 'emptyStar',
      '0.25': 'quarterStar',
      '0.50': 'halfStar',
      '0.75': 'threeQuarterStar',
      '1.00': 'fullStar'
    };
    let wholeNum = Math.floor(stars);
    let remainder = stars - wholeNum;
    for (let i = 0; i < wholeNum; i++) {
      result.push(classes['1.00']);
      counter++;
    }
    if (remainder > 0) {
      let quarter = (Math.round(remainder * 4) / 4).toFixed(2);
      result.push(classes[quarter]);
      counter++;
    }
    if (counter < 5) {
      for (let i = counter; i < 5; i++) {
        result.push(classes['0.00']);
      }
    }
    let starList = result.map((star) => {
      return <span className={star}></span>
    })
    return <div>{starList}</div>
  }

  render() {
    return (
      <div className="overviewStars">
        {this.displayRating(this.state.rating)}
      </div>
    )
  }
}

export default ClickTracker(Stars);
