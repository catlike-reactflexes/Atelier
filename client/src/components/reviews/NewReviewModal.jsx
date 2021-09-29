import React from 'react'
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class NewReviewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {


    }
  }

  postReview() {
    console.log('filler')
  }

  render() {
    return (
    <form onSubmit={this.postReview.bind(this)}>
      <p className = 'recRadioBtns'>Do you recommend this product?</p>
      <input type = 'radio' id = 'recBtnYes'></input>
      <label for ='recBtnYes'>Yes</label>
      <input type = 'radio' id = 'recBtnNo'></input>
      <label for ='recBtnNo'>No</label>

      <input type = 'text' id = 'reviewSummary'></input>
      <label for = 'reviewSummary'>type a summary here</label>

      <textarea id="reviewBody" cols="40" rows="5"></textarea>
      <label for = 'reviewBody'>type review here</label>

      <input type = 'text' id = 'reviewerName'></input>
      <label for = 'reviewerName'>type your username here</label>

      <input type = 'text' id = 'reviewerEmail'></input>
      <label for = 'reviewerEmail'>type your email</label>

      <input type = 'submit' value = 'submit review'></input>
    </form>
    )
  }
}

export default ClickTracker(NewReviewModal);