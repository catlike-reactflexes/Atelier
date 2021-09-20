import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.combineProps = this.combineProps.bind(this);
  }

  combineProps() {
    console.log(this.props.productData)
    console.log(this.props.imageData);
    for (var i = 0; i < this.props.productData.length; i++) {

      this.props.productData[i].image = this.props.imageData[i];



    }
    console.log('after loop: ', this.props.productData);
  }


  render() {
    for (var i = 0; i < this.props.productData.length; i++) {
      this.props.productData[i].image = this.props.imageData[i];
    }
    let productItems = this.props.productData.map((item, index) => {
      return <RelatedProductsCard key={index} name={item.name} price={item.default_price} category={item.category} description={item.description}
        image={item.image} />
    })
    return (
      <ul id="relatedProductCards">
        {productItems}
      </ul>
    )
  }
}

export default RelatedProductsList;
