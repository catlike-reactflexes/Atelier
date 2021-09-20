import React from 'react'

const Review = (props) => {
  // console.log(props.review)
  return (
    <div className='review'>
      <div>{props.review.reviewer_name}</div>
      <div>{props.review.summary}</div>
    </div>
  )
}

export default Review