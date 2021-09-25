import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const NewReview = (props) => {
  return (
    <div className='buttons'>
      <button className='newReview' type="button" onClick= {() => {props.postTrackInteractions('new review button', 'reviews')}}>Add a Review</button>
      <button className='moreReviews' type="button" onClick={() => {props.postTrackInteractions('load more reviews button', 'reviews')}}>More Reviews</button>
    </div>
  );
};

export default ClickTracker(NewReview);