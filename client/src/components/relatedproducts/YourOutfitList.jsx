import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    let outfitItems = [];

    for (var i = 0; i < this.props.yourOutfitData.length; i++) {
      this.props.yourOutfitData[i].image = this.props.yourOutfitImageURLs[i];
    }

    if (this.props.yourOutfitImageURLs.length > 0 && this.props.yourOutfitData.length > 0) {

      outfitItems = this.props.yourOutfitData.map((item, index) => {
        return <YourOutfitCard key={index} name={item.name} image={item.image} price={item.default_price}
          category={item.category} />
      })
    }
    return (
      <div>
        <ul id="relatedProductCards" onClick={() => this.props.postTrackInteractions('related product card', 'Related Products')}>
          {outfitItems}
        </ul>
      </div>
    )
  }
}

export default ClickTracker(YourOutfitList);
