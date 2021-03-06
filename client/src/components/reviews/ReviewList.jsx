import React from 'react';
import Review from './Review.jsx'
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const ReviewList = (props) => {
  return (
    <div className='reviewList'>
      {props.reviews.map((review, index)=> {
          return <Review key = {index} review = {review} refreshReviews = {props.refreshReviews} count = {props.count}/>
      })}
    </div>
  )
};

export default ClickTracker(ReviewList);