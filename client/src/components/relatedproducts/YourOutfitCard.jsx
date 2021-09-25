import React from 'react';
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
            <img src="https://via.placeholder.com/150"></img>
            <h4>{this.props.name}</h4>
            <p className="price">$19.99</p>
            <p>Some text about the product...</p>
          </div>
        </li>
      </div>

    )
  }

}

export default ClickTracker(YourOutfitCard);
