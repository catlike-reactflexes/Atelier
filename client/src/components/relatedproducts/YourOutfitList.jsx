import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let outfitItems = this.props.dummyData.map((item, index) => {
      return <YourOutfitCard key={index} name={item.name} />
    })
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
