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

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .4)',
  zIndex: 1000
}

export default ClickTracker(NewReviewModal);