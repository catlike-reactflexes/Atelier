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

    console.log('this is the count: ', this.props.count)
    this.props.moreReviews(this.props.count)
  }

  render() {
    return (
      <div className='buttons'>
        <button className='newReview' type="button" onClick= {() => {this.props.postTrackInteractions('new review button', 'reviews'); this.props.openModal(true)}}>Add a Review</button>
        <button className='moreReviews' type="button" onClick={() => {this.props.postTrackInteractions('load more reviews button', 'reviews'); this.moreReviewsClick()}}>More Reviews</button>
      </div>
    );
  }
};

export default ClickTracker(NewReview);