import React from 'react';

class ReviewBreakdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sizeValue: 0
    };
  }
  render() {
    return (
    <div className='reviewBreakdown'>
      <div className='sliders'>
        <input type="range" min="1" max="5" value={this.state.sizeValue} class="slider" id="size" />
      </div>
    </div>
    )
  }
};

export default ReviewBreakdown