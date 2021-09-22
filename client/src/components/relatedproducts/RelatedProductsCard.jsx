import React from 'react';
import ComparisonModalList from './ComparisonModalList.jsx';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comparisonModalVisible: false
    }
    this.showComparisonModal = this.showComparisonModal.bind(this);
  }

  showComparisonModal() {
    event.preventDefault();
    this.setState({
      comparisonModalVisible: true
    });
  }


  //set star to absolute position within the card element
  render() {
    console.log('props in cards: ', this.props);
    return (
      <div>
        <li className="relatedProductsItems" >
          <div className="card">
            <div className="imageContainer">
              <img onClick={this.showComparisonModal} className="relatedProductImg" src={this.props.image}></img>
            </div>
            <p className="category">{this.props.category}</p>
            <p className="productName">{this.props.name}</p>
            <p className="price">${this.props.price}</p>
          </div>
        </li >
        {this.state.comparisonModalVisible ?
          <ComparisonModalList productFeatures={this.props.productFeatures} name={this.props.name} overviewProduct={this.props.overviewProduct} /> :
          <div></div>}
      </div>
    )
  }

}

export default RelatedProductsCard;
