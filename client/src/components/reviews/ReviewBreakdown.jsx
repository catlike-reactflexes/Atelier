import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const sliderStyle = {
  "background-color": 'green',
  "color": "white",
  "padding": "1%",
  "font-size": "20px",
  "border-radius": "15px",
  "width": "60%",
};

const ReviewBreakdown = (props) => {


    // console.log('comfort value', this.props.reviewChars)

    return (
    <React.Fragment>
    <div className='productBreakdown'>
      <div className='sliders' onClick = {() => {props.postTrackInteractions('characteristic ratings', 'Reviews')}}>
        <input type="range" min="1" max="5" value={props.reviewChars.Comfort.value}  id="comfortSlider"></input>
        <input type="range" min="1" max="5" value={props.reviewChars.Fit.value}  id="fitSlider"></input>
        <input type="range" min="1" max="5" value={props.reviewChars.Length}  id="lengthSlider"></input>
        <input type="range" min="1" max="5" value={props.reviewChars.Quality}  id="qualitySlider"></input>
      </div>
        <div className = 'barContainer'>
          <div className = '5stars bar' style={sliderStyle}></div>
        </div>
        <div className = 'barContainer' >
          <div className = '4stars bar' style={sliderStyle}></div>
        </div>
        <div className = 'barContainer' >
          <div className = '3stars bar' style={sliderStyle}></div>
        </div>
        <div className = 'barContainer' >
          <div className = '2stars bar' style={sliderStyle}></div>
        </div>
        <div className = 'barContainer' >
          <div className = '1stars bar' style={sliderStyle}></div>
        </div>
    </div>
    </React.Fragment>
    )

};


export default ClickTracker(ReviewBreakdown)