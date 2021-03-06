import React from 'react';
import ComparisonModalList from './ComparisonModalList.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import Stars from './Stars.jsx';
import { FaStar } from 'react-icons/fa';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comparisonModalVisible: false,
      dataLoaded: false
    }
    this.hideComparisonModal = this.hideComparisonModal.bind(this);
    this.showComparisonModal = this.showComparisonModal.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  }

  redirectPage() {
    window.location.href = `http://localhost:3000/${this.props.id}/`
  }

  showComparisonModal(event) {
    event.preventDefault();
    this.setState({ comparisonModalVisible: true });
    document.addEventListener('click', this.hideComparisonModal, true);
  }

  hideComparisonModal() {
    this.setState({ comparisonModalVisible: false }, () => {
      document.removeEventListener('click', this.hideComparisonModal);
    });
  }

  dataLoaded() {
    if (this.props.image.length > 0) {
      this.setState({
        dataLoaded: true
      })
    }
  }

  render() {
    return (
      <div>

        <li className="relatedProductsItems">

          <div className="card">
            <FaStar className="modalStar" onClick={this.showComparisonModal} />
            <div className="imageContainer">
              <img className="relatedProductImg" src={this.props.image} onClick={this.redirectPage}></img>
            </div>
            <p className="category">{this.props.category}</p>
            <p className="productName">{this.props.name}</p>
            <p className="price">${Number(this.props.price).toFixed()}</p>
            <Stars id={this.props.id} />

          </div>

        </li >
        {this.state.comparisonModalVisible ?
          <ComparisonModalList productFeatures={this.props.productFeatures} name={this.props.name} overviewProduct={this.props.overviewProduct} /> :
          <div></div>}
      </div>
    )
  }

}

export default ClickTracker(RelatedProductsCard);
