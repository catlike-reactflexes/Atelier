import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import NewReviewModal from './NewReviewModal.jsx';

const NewReview = (props) => {
  let count = 2
  let moreReviewsClick = () => {
    props.moreReviews(count)
    count = count  + 2
    console.log('this is the count: ', count)
  }

  let openModal = () => {}

  return (
    <div className='buttons'>
      <button className='newReview' type="button" onClick= {() => {props.postTrackInteractions('new review button', 'reviews')}}>Add a Review</button>
      <button className='moreReviews' type="button" onClick={() => {props.postTrackInteractions('load more reviews button', 'reviews'); () => {moreReviewsClick()}}}>More Reviews</button>
    </div>
  );
};

export default ClickTracker(NewReview);