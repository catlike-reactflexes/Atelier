import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.transformLeft = this.transformLeft.bind(this);
    this.transformRight = this.transformRight.bind(this);
  }

  transformLeft() {
    // transform: "translateX-(25%)"
    this.props.postTrackInteractions('Left carousel arrow', 'Related Products');
    console.log('left chevron clicked')
    document.getElementById("relatedProductCards").style.transform = "translateX(-25%)";

  }

  transformRight() {
    // transform: "translateX(25%)"
    console.log('right chevron clicked')
    this.props.postTrackInteractions('Right chevron arrow', 'Related Products');
    document.getElementById("relatedProductCards").style.transform = "translateX(25%)";
  }

  render() {
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
      <div id="cardContainer" >
        <FaChevronLeft onClick={this.transformLeft} />
        <ul id="relatedProductCards" onClick={() => this.props.postTrackInteractions('related product card', 'Related Products')}>
          {productItems}
        </ul>
        <FaChevronRight onClick={this.transformRight} />
      </div>
    )
  }
}

export default ClickTracker(RelatedProductsList);
