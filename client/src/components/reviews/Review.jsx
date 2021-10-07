import React from 'react'
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import Moment from 'react-moment';

class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      helpfulness: this.props.review.helpfulness
    }
    this.markReviewAsHelpful = this.markReviewAsHelpful.bind(this)
    this.reportReview = this.reportReview.bind(this)
  }
  // console.log(props.review)

markReviewAsHelpful() {
  this.props.postTrackInteractions('helpful button', 'Reviews')
  axios.get('/reviewhelpful', {
    params: {
      review_id: this.props.review.review_id
    }
  })
  .then(response => {
    console.log('put response', response)
    this.setState({helpfulness: this.state.helpfulness + 1})
  })
  .catch(error => {
    console.log(this.state.helpfulness)
    console.log('put error', error)
  })
}

reportReview () {
  this.props.postTrackInteractions('report button', 'Reviews')
  axios.get('/reviewreport', {
    params: {
      review_id: this.props.review.review_id
    }
  })
  .then(response => {
    console.log('report put response', response.data)
  })
  .catch(error => {
    console.log('report put error', error)
  })
}

render() {
  return (
    <div className='review'>
      <span className='reviewer_name' onClick={() => {this.props.postTrackInteractions('reviewer name', 'Reviews')}}>{this.props.review.reviewer_name}</span>
      <span className='review_date' ><Moment format="MMM DD, YYYY">{this.props.review.date}</Moment></span>
      <br></br>
      <b className='review_summary'>{this.props.review.summary}</b>
      <div className='review_body' onClick={() => {this.props.postTrackInteractions('review body', 'Reviews')}}>{this.props.review.body}</div>
      <button className='helpfulBtn' onClick = {() => {this.markReviewAsHelpful();}}>helpful? {this.state.helpfulness}</button>
      <button className='reportBtn' onClick = {() => {this.reportReview();this.props.refreshReviews()}}>report</button>
    </div>
  )
}

}

export default ClickTracker(Review)