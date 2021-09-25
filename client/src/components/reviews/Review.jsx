import React from 'react'
import axios from 'axios';

const Review = (props) => {
  // console.log(props.review)

let markReviewAsHelpful = () => {
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
      <div className='reviewer_name'>{props.review.reviewer_name}</div>
      <div className='review_body'>{props.review.body}</div>
      <button className='helpfulBtn' onClick = {() => {markReviewAsHelpful()}}>helpful? {props.review.helpfulness}</button>
      <button className='reportBtn' onClick = {() => {reportReview()}}>report</button>
    </div>
  )
}

export default Review