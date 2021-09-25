import React from 'react'
import axios from 'axios';

const Review = (props) => {
  // console.log(props.review)

let markReviewAsHelpful = (reviewID) => {
  console.log('review id in helpful', reviewID)
  axios.get('/helpful', {
    params: {
      review_id: reviewID
    }
  })
  .then(response => {
    console.log('put response', response)
  })
  .catch(error => {
    console.log('put error', error)
    throw error
  })
}

let reportReview = (reviewID) => {
  axios.get('/report', {
    params: {
      review_id: reviewID
    }
  })
  .then(response => {
    console.log('report put response', response)
  })
  .catch(error => {
    console.log('report put error', error)
    throw error
  })
}
  return (
    <div className='review'>
      <div className='reviewer_name'>{props.review.reviewer_name}</div>
      <div className='review_body'>{props.review.body}</div>
      <button className='helpfulBtn' >helpful?</button>
      <button className='reportBtn' >report</button>
    </div>
  )
}

export default Review