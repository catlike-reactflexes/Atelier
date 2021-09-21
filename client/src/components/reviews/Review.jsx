import React from 'react'

const Review = (props) => {
  // console.log(props.review)
  return (
    <div className='review'>
      <div className='reviewer_name'>{props.review.reviewer_name}</div>
      <div className='summary'>{props.review.summary}</div>
    </div>
  )
}

export default Review