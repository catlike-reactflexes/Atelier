import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
    this.transformLeft = this.transformLeft.bind(this);
    this.transformRight = this.transformRight.bind(this);

  }

  transformLeft() {
    // transform: "translateX-(25%)"
    this.props.postTrackInteractions('Left carousel arrow', 'Related Products');
    console.log('left chevron clicked')
    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex - 1 }
    })
    // document.getElementById("relatedProductCards").style.transform = "translateX(-25%)"
  }


  transformRight() {
    // transform: "translateX(25%)"
    console.log('right chevron clicked')
    this.props.postTrackInteractions('Right chevron arrow', 'Related Products');
    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex + 1 }
    })
    // document.getElementById("relatedProductCards").style.transform = "translateX(25%)";
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
    let transformStyle = { transform: `translateX(-${this.state.currentIndex * 200}px)` }
    return (
      <>
        <div id="cardContainer" >
          {this.state.currentIndex > 0 && <FaChevronLeft onClick={this.transformLeft} />}
          < div style={{ overflow: 'hidden', width: '825px' }} >
            <ul style={transformStyle} id="relatedProductCards" onClick={() => this.props.postTrackInteractions('related product card', 'Related Products')}>
              {productItems}
            </ul>
          </div >
          {this.state.currentIndex < this.props.productData.length - 3 && <FaChevronRight onClick={this.transformRight} />}
        </div >
      </>
    )
  }
}

export default ClickTracker(RelatedProductsList);
