import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const NewReview = () => {
  return (
    <div className='buttons'>
      <button className='newReview' type="button" onClick=>Add a Review</button>
      <button className='moreReviews' type="button">More Reviews</button>
    </div>
  );
};

export default ClickTracker(NewReview);