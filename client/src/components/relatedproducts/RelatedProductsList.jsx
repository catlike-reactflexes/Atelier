import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }

  }



  render() {
    let cardData = this.props.dummyData.concat(this.props.imagesData);
    console.log('card data: ', cardData);
    let productItems = this.props.dummyData.map((item, index) => {
      return <RelatedProductsCard key={index} name={item.name} price={item.default_price} category={item.category} description={item.description} />
    })
    return (
      <ul id="relatedProductCards">
        {productItems}
      </ul>
    )
  }
}

export default RelatedProductsList;
