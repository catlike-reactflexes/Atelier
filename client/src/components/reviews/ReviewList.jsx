import React from 'react';
import Review from './Review.jsx'

const ReviewList = (props) => {
  return (
    <div className='reviewList'>
      {props.reviews.map((review, index)=> {
          return <Review key = {index} review = {review}/>
      })}
    </div>
  )
};

export default ReviewList;