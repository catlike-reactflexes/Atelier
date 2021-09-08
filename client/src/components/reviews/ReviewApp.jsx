import React from 'react';
import Reviewlist from 'Reviewlist';
import Search from 'Search';
import NewReview from 'NewReview';

class ReviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: []
    };
  }

  render() {
    return (
      <div>
        <Search />
        <Reviewlist reviews = {this.state.reviewList}/>
        <NewReview />
      </div>
    );
  }
}

export default ReviewApp;
