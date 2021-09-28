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
      reviewRating: {},
      reviewRecommended: {}
    };
    this.getReviews = this.getReviews.bind(this)
    this.getReviewMeta = this.getReviewMeta.bind(this)
  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        productID: this.state.defaultProductID
      }
    })
      .then(arrayOfReviews => {
        // console.log('this is reviews from api call:', arrayOfReviews.data.results)
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
          reviewRating: reviewMetaData.data.ratings,
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
    return (
      <div className='reviews'>
        {/* <Search /> */}
        <div className='RnR'>
          <ReviewBreakdown product_id = {this.state.defaultProductID} reviewChars = {this.state.reviewCharacteristics} reviewRating = {this.state.reviewRating} reviewRecommended = {this.state.reviewRecommended}/>
          <ReviewList click= {this.click.bind(this)} reviews = {this.state.reviews}/>
        </div>
        <NewReview />
        {/* <NewReviewModal /> */}
      </div>
    );
  }
}

export default ReviewApp;
