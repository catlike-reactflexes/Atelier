import React from 'react'
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

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
      <div className='reviewer_name' onClick={() => {props.postTrackInteractions('reviewer name', 'Reviews')}}>{props.review.reviewer_name}</div>
      <div className='review_body' onClick={() => {props.postTrackInteractions('review body', 'Reviews')}}>{props.review.body}</div>
      <button className='helpfulBtn' onClick = {() => {markReviewAsHelpful(); props.click()}}>helpful? {props.review.helpfulness}</button>
      <button className='reportBtn' onClick = {() => {reportReview(); props.click()}}>report</button>
    </div>
  )
}

export default ClickTracker(Review)