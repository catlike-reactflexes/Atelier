import React from 'react'

const Review = (props) => {
  // console.log(props.review)
  return (
    <div className='review'>
      {props.review.summary}
    </div>
  )
}

export default Review