import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx'
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import NewReviewModal from './NewReviewModal.jsx';

class ReviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [
        {
          "review_id": 5,
          "rating": 3,
          "summary": "I'm enjoying wearing these shades",
          "recommend": false,
          "response": null,
          "body": "Comfortable and practical.",
          "date": "2019-04-14T00:00:00.000Z",
          "reviewer_name": "shortandsweeet",
          "helpfulness": 5,
          "photos": [{
              "id": 1,
              "url": "urlplaceholder/review_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/review_5_photo_number_2.jpg"
            },
            // ...
          ]
        },
        {
          "review_id": 3,
          "rating": 4,
          "summary": "I am liking these glasses",
          "recommend": false,
          "response": "Glad you're enjoying the product!",
          "body": "They are very dark. But that's good because I'm in very sunny spots",
          "date": "2019-06-23T00:00:00.000Z",
          "reviewer_name": "bigbrotherbenjamin",
          "helpfulness": 5,
          "photos": [],
        },
      ],
      defaultProductID: props.id,
      reviewCharacteristics: {
        "Length": {
          "id": 14,
          "value": "4.0000"
        },
        "Width": {
          "id": 15,
          "value": "3.5000"
        },
        "Comfort": {
          "id": 16,
          "value": "4.0000"
        },
        "Fit": {
          "id": 17,
          "value": "3.0000"
        }
        // ...
      },
      reviewRatings: {},
      reviewRecommended: {},
      totalRating: 0,
      modalIsOpen: false,
      count: 2,
      numOfReviews: props.numOfReviews
    };
    this.getReviews = this.getReviews.bind(this)
    this.getReviewMeta = this.getReviewMeta.bind(this)
    this.openModal = this.openModal.bind(this)
    this.displayRating = this.displayRating.bind(this)
  }

  openModal(bool) {
    console.log('modal click registered')
    this.setState({modalIsOpen:bool})
  }

  getReviews(count = 2) {
    console.log('more reviews click')
    axios.get('/reviews', {
      params: {
        productID: this.state.defaultProductID,
        count: count
      }
    })
      .then(arrayOfReviews => {
        // console.log('this is reviews from api call:', arrayOfReviews.data.results)
        this.setState({count: this.state.count + 2})
        console.log
        this.setState({reviews:arrayOfReviews.data.results})
      })
      .catch(error => {
        console.log('get error', error)
        throw error
      })
  }

  click() {
    this.getReviews()
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
    // console.log('classes: ', result);
    let starList = result.map((star) => {
      return <span className={star}></span>
    })
    return <span>{starList}</span>
  }

  getReviewMeta() {
    axios.get('/reviewmeta', {
      params: {
        productID: this.state.defaultProductID
      }
    })
      .then(reviewMetaData => {
        console.log('this is review metaData:', reviewMetaData.data)
        this.setState({
          reviewCharacteristics: reviewMetaData.data.characteristics,
          reviewRatings: reviewMetaData.data.ratings,
          reviewRecommended: reviewMetaData.data.recommended
        })
      })
      .catch(error => {
        console.log('get meta error', error)
        throw error
      })
  }

  componentDidMount() {
    this.getReviews()
    this.getReviewMeta()
  }



  render() {
    // console.log('what does this look like: ', this.props.totalRating)
    return (
      <div className='reviews'>
        <h2>Ratings and Reviews</h2>
        <br></br>
        <span style = {{'padding-right': '20px', 'font-size': '80px'}}>{this.props.totalRating.toString().slice(0,3)}</span>
        {this.displayRating(this.props.totalRating)}
        <br></br>
        <label style = {{'padding-bottom' : '20px'}} for="options">{this.props.numOfReviews} reviews, sorted by:</label>

        <select name="options" id="options">
          <option value="helpful">helpful</option>
          <option value="relevant">relevant</option>
          <option value="newest">newest</option>
        </select>
        {/* <Search /> */}
        <div className='RnR'>
          <ReviewBreakdown totalRating = {this.props.totalRating} product_id = {this.state.defaultProductID} reviewChars = {this.state.reviewCharacteristics} reviewRatings = {this.state.reviewRatings} reviewRecommended = {this.state.reviewRecommended}/>
          <ReviewList refreshReviews = {this.getReviews.bind(this)} reviews = {this.state.reviews} count = {this.state.count}/>
        </div>
        <NewReview moreReviews = {this.getReviews} openModal = {this.openModal} count = {this.state.count}/>
        <NewReviewModal isOpen = {this.state.modalIsOpen} openModal = {this.openModal} productName = {this.props.productName}/>
      </div>
    );
  }
}

export default ReviewApp;
