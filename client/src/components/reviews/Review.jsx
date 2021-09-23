import React from 'react'
import axios from 'axios';

const Review = (props) => {
  // console.log(props.review)

let markReviewAsHelpful = (reviewID) => {
  axios.put('/helpful', {
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

  return (
    <div className='review'>
      <div className='reviewer_name'>{props.review.reviewer_name}</div>
      <div className='review_body'>{props.review.body}</div>
      <button className='helpfulBtn' onClick = {markReviewAsHelpful(props.review.review_id)}>helpful?</button>
    </div>
  )
}

export default Review