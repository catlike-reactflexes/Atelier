import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <li className="relatedProductsItems">
          <div className="card">
            <div className="imageContainer">
              <img onClick={this.showComparisonModal} className="relatedProductImg" src={this.props.image.results[0].photos[0].thumbnail_url}></img>
            </div>
            <p className="category">{this.props.category}</p>
            <p className="productName">{this.props.name}</p>
            <p className="price">${Number(this.props.price).toFixed()}</p>
          </div>
        </li >
      </div>

    )
  }


}


export default ClickTracker(YourOutfitCard);
