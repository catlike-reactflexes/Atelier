import React from 'react'
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import Moment from 'react-moment';

const Review = (props) => {
  // console.log(props.review)

let markReviewAsHelpful = () => {
  props.postTrackInteractions('helpful button', 'Reviews')
  axios.get('/reviewhelpful', {
    params: {
      review_id: props.review.review_id
    }
  })
  .then(response => {
    console.log('put response', response)
  })
  .catch(error => {
    console.log('put error', error)
  })
}

let reportReview = () => {
  props.postTrackInteractions('report button', 'Reviews')
  axios.get('/reviewreport', {
    params: {
      review_id: props.review.review_id
    }
  })
  .then(response => {
    console.log('report put response', response.data)
  })
  .catch(error => {
    console.log('report put error', error)
  })
}
  return (
    <div className='review'>
      <span className='reviewer_name' onClick={() => {props.postTrackInteractions('reviewer name', 'Reviews')}}>{props.review.reviewer_name}</span>
      <span className='review_date' ><Moment format="MMM, DD, YYYY">{props.review.date}</Moment></span>
      <div className='review_summary'>{props.review.summary}</div>
      <div className='review_body' onClick={() => {props.postTrackInteractions('review body', 'Reviews')}}>{props.review.body}</div>
      <button className='helpfulBtn' onClick = {() => {markReviewAsHelpful(); props.refreshReviews(props.count)}}>helpful? {props.review.helpfulness}</button>
      <button className='reportBtn' onClick = {() => {reportReview(); props.refreshReviews(props.count)}}>report</button>
    </div>
  )
}

export default ClickTracker(Review)