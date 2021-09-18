import React from 'react';
import Review from './Review.jsx'

const ReviewList = (props) => {
  return (
    <div className='reviewList'>
      {props.reviews.map(review => {
        return (
          <div className='review'>
            <div>{review.reviewer_name}</div>
            <div>{review.summary}</div>
          </div>
        )
      })}
    </div>
  )
};

export default ReviewList;