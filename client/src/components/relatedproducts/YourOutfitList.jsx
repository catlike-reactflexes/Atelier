import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
    this.transformLeft = this.transformLeft.bind(this);
    this.transformRight = this.transformRight.bind(this);
  }

  transformLeft() {
    this.props.postTrackInteractions('Left carousel arrow', 'Related Products');
    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex - 1 }
    })
  }


  transformRight() {
    this.props.postTrackInteractions('Right chevron arrow', 'Related Products');
    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex + 1 }
    })
  }


  render() {
    let outfitItems = [];

    for (var i = 0; i < this.props.yourOutfitData.length; i++) {
      this.props.yourOutfitData[i].image = this.props.yourOutfitImageURLs[i];
    }

    if (this.props.yourOutfitImageURLs.length > 0 && this.props.yourOutfitData.length > 0) {

      outfitItems = this.props.yourOutfitData.map((item, index) => {
        return <YourOutfitCard key={index} name={item.name} image={item.image} price={item.default_price}
          category={item.category} id={item.id} updateOutfitData={this.props.updateOutfitData} />
      })
    }
    let transformStyle = { transform: `translateX(-${this.state.currentIndex * 200}px)` }
    return (
      <>
        <div className="cardContainer">
          {this.state.currentIndex > 0 && <FaChevronLeft onClick={this.transformLeft} />}
          <div style={{ overflow: 'hidden', width: '825px' }}>
            <ul style={transformStyle} id="relatedProductCards" onClick={() => this.props.postTrackInteractions('your outfit card', 'Your Outfit')}>
              {outfitItems}
            </ul>
          </div>
          {this.state.currentIndex < this.props.yourOutfitData.length - 3 && <FaChevronRight onClick={this.transformRight} />}
        </div>
      </>
    )
  }
}

export default ClickTracker(YourOutfitList);
