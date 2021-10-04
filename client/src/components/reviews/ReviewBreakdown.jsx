import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const ReviewBreakdown = (props) => {


    // console.log('comfort value', this.props.reviewChars)
    let sliderStyle = {
        height: '24px',
        width: '50%'
    };

    return (
    <React.Fragment>
    <div className='reviewBreakdown'>
      <div className='sliders' onClick = {() => {props.postTrackInteractions('characteristic ratings', 'Reviews')}}>
        <input type="range" min="1" max="5" value={props.reviewChars.Comfort.value}  id="comfortSlider"></input>
        <input type="range" min="1" max="5" value={props.reviewChars.Fit.value}  id="fitSlider"></input>
        <input type="range" min="1" max="5" value={props.reviewChars.Length}  id="lengthSlider"></input>
        <input type="range" min="1" max="5" value={props.reviewChars.Quality}  id="qualitySlider"></input>
      </div>
      <div className='ratingBars'>
        <div className = '5stars' style={sliderStyle}></div>
        <div className = '4stars' style={sliderStyle}></div>
        <div className = '3stars' style={sliderStyle}></div>
        <div className = '2stars' style={sliderStyle}></div>
        <div className = '1stars' style={sliderStyle}></div>
      </div>
    </div>
    </React.Fragment>
    )

};

export default ClickTracker(ReviewBreakdown)