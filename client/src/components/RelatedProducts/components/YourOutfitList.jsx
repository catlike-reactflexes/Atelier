import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let outfitItems = this.props.dummyData.map((item, index) => {
      return <YourOutfitCard key={index} name={item.name} />
    })
    return (
      <ul id="relatedProductCards">
        {outfitItems}
      </ul>
    )
  }
}

export default YourOutfitList;