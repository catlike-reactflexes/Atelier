import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';
class ImagesList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let imageItems = this.props.imagesData.map((item, index) => {
      return <RelatedProductsCard key={index} image={item} />
    })
    return (
      <ul id="relatedProductCards">
        {imageItems}
      </ul>
    )
  }
}

export default ImagesList;