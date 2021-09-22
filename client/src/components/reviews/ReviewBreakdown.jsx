import React from 'react';

class ReviewBreakdown extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    let comObj = this.props.reviewChars.Comfort
    console.log('comfort value', comObj)
    return (
    <div className='reviewBreakdown'>
      <div className='sliders'>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Comfort}  id="comfortSlider"></input>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Fit}  id="fitSlider"></input>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Length}  id="lengthSlider"></input>
        <input type="range" min="1" max="5" value={this.props.reviewChars.Quality}  id="QualitySlider"></input>
      </div>
    </div>
    )
  }
};

export default ReviewBreakdown