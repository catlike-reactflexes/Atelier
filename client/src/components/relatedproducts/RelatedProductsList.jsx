import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('props in card list: ', this.props);
    for (var i = 0; i < this.props.productData.length; i++) {
      this.props.productData[i].image = this.props.imageData[i];
    }
    let productItems = this.props.productData.map((item, index) => {
      return <RelatedProductsCard key={index} name={item.name} price={item.default_price} category={item.category} description={item.description}
        overviewProduct={this.props.overviewProduct}
        image={item.image}
        productFeatures={item.features} />
    })
    return (
      <ul id="relatedProductCards">
        {productItems}
      </ul>
    )
  }
}

export default RelatedProductsList;
