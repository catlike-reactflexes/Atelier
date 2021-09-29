import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';


class ProductButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    }
    this.getSizes = this.getSizes.bind(this);
  }

  getSizes(skus) {
    let sizes = Object.keys(skus).map((key, index) => {
      return <option id={key} key={key} data-quantity={skus[key].quantity}>{skus[key].size}</option>
    })
    sizes.unshift(<option value="" disabled selected>SELECT SIZE</option>);
    return <select onClick={() => { this.props.postTrackInteractions('Select Size', 'Product Buttons') }} id="sizeSelect">{sizes}
    </select>;
  }

  displayQty(sku) {

  }

  render() {
    return (
      <div id="productButtons" data-testid="overview-buttons">
        {this.props.loaded ?
          <div>
            {this.getSizes(this.props.selected.skus)}
            <select id="qtySelect">
              <option>1</option>
            </select>
            <button id="bagBtn" onClick={() => { this.props.postTrackInteractions('Add to bag', 'Product Buttons') }}>ADD TO BAG</button>
            <button id="favBtn" onClick={() => { this.props.favoriteItem() }} >*</button>
          </div>
          : <div>Loading Data</div>}
      </div>
    )
  }
};

export default ClickTracker(ProductButtons);
