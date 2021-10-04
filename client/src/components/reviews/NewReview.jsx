import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import NewReviewModal from './NewReviewModal.jsx';

const NewReview = (props) => {
  let count = 2
  let moreReviewsClick = () => {
    count = count  + 2

    props.moreReviews(count)
    console.log('this is the count: ', count)
  }


  return (
    <div className='buttons'>
      <button className='newReview' type="button" onClick= {() => {props.postTrackInteractions('new review button', 'reviews'); props.openModal(true)}}>Add a Review</button>
      <button className='moreReviews' type="button" onClick={() => {props.postTrackInteractions('load more reviews button', 'reviews'); moreReviewsClick()}}>More Reviews</button>
    </div>
  );
};

export default ClickTracker(NewReview);