import React from 'react';

class ReviewBreakdown extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount

  render() {
    console.log('comfort value', this.props.reviewChars)
    let sliderStyle = {
        height: '24px',
        width: '50%'
    }
    return (
    <div className='reviewBreakdown'>
      <div className='sliders'>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Comfort.value}  id="comfortSlider"></input>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Fit.value}  id="fitSlider"></input>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Length}  id="lengthSlider"></input>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Quality}  id="qualitySlider"></input>
      </div>
      <div className='ratingBars'>
        <div className = '5stars' style={sliderStyle}></div>
        <div className = '4stars' style={sliderStyle}></div>
        <div className = '3stars' style={sliderStyle}></div>
        <div className = '2stars' style={sliderStyle}></div>
        <div className = '1stars' style={sliderStyle}></div>
      </div>
    </div>
    )
  }
};

export default ReviewBreakdown