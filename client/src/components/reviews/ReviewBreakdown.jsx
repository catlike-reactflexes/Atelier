import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import StarBar from './StarBar.jsx';
import CharBars from './CharBars.jsx'

const sliderStyle = {
  "background-color": 'green',
  "color": "white",
  "padding": "1%",
  "font-size": "20px",
  "border-radius": "15px",
  "width": "60%",
};

class ReviewBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewRatings: this.props.reviewRatings
    }
  }

  render () {
    // console.log('num of reccomended: ', this.props.reviewRecommended)
    let total = Number(this.props.reviewRatings['1']) + Number(this.props.reviewRatings['2']) + Number(this.props.reviewRatings['3']) + Number(this.props.reviewRatings['4']) + Number(this.props.reviewRatings['5'])
    return (
      <React.Fragment>
      <div className='productBreakdown'>
        {/* <div className='sliders' onClick = {() => {props.postTrackInteractions('characteristic ratings', 'Reviews')}}>
          <input type="range" min="1" max="5" value={props.reviewChars.Comfort.value}  id="comfortSlider"></input>
          <input type="range" min="1" max="5" value={props.reviewChars.Fit.value}  id="fitSlider"></input>
          <input type="range" min="1" max="5" value={props.reviewChars.Length}  id="lengthSlider"></input>
          <input type="range" min="1" max="5" value={props.reviewChars.Quality}  id="qualitySlider"></input>
        </div> */}
        <div className = 'starBarsContainer'>
          <div className = 'starBarContainerTwo'>
            <div style={{ marginRight: '10px' }}>5 Stars</div>
            <StarBar starBarStyle={`${Number(this.props.reviewRatings['5']) / total * 100}%`}/>
            <div>{this.props.reviewRatings['5']}</div>
            <br></br>
          </div>
          <div className = 'starBarContainerTwo'>
            <div style={{ marginRight: '10px' }}>4 Stars</div>
            <StarBar starBarStyle={`${Number(this.props.reviewRatings['4']) / total * 100}%`}/>
            <span>{this.props.reviewRatings['4']}</span>
            <br></br>
          </div>
          <div className = 'starBarContainerTwo'>
            <div style={{ marginRight: '10px' }}>3 Stars</div>
            <StarBar starBarStyle={`${Number(this.props.reviewRatings['3']) / total * 100}%`}/>
            <span>{this.props.reviewRatings['3']}</span>
            <br></br>
          </div>
          <div className = 'starBarContainerTwo'>
            <div style={{ marginRight: '10px' }}>2 Stars</div>
            <StarBar starBarStyle={`${Number(this.props.reviewRatings['2']) / total * 100}%`}/>
            <span>{this.props.reviewRatings['2']}</span>
            <br></br>
          </div>
          <div className = 'starBarContainerTwo'>
            <div style={{ marginRight: '16px' }}>1 Star</div>
            <StarBar starBarStyle={`${Number(this.props.reviewRatings['1']) / total * 100}%`}/>
            <span>{this.props.reviewRatings['1']}</span>
            <br></br>
          </div>
        </div>
        <br></br>
        <div className='chars'>
          <CharBars reviewChars = {this.props.reviewChars} />
        </div>
      </div>
      </React.Fragment>
      )
  }

};


export default ClickTracker(ReviewBreakdown)