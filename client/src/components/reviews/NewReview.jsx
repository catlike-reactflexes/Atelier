import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import NewReviewModal from './NewReviewModal.jsx';

class NewReview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count:  2
    }
  }
  moreReviewsClick() {
    // this.setState({count:this.state.count + 2})

    console.log('this is the count in NewReview: ', this.props.count)
  }

  render() {
    if (this.props.count >= this.props.numOfReviews) {
      return (
        <div className='buttons'>
          <button className='newReview' type="button" onClick= {() => {this.props.postTrackInteractions('new review button', 'reviews'); this.props.openModal(true)}}>Add a Review</button>
        </div>
      );
    }
    return (
      <div className='buttons'>
        <button className='newReview' type="button" onClick= {() => {this.props.postTrackInteractions('new review button', 'reviews'); this.props.openModal(true)}}>Add a Review</button>
        <button className='moreReviews' type="button" onClick={() => {this.props.postTrackInteractions('load more reviews button', 'reviews'); this.props.moreReviews(this.props.count)}}>More Reviews</button>
      </div>
    );
  }
};

export default ClickTracker(NewReview);