import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';


class ProductButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      quantity: 0
    }
    this.getSizes = this.getSizes.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getSizes(skus) {
    let sizes = Object.keys(skus).map((key, index) => {
      return <option id={key} key={key} data-qty={skus[key].quantity} value={skus[key].size}>{skus[key].size}</option>
    })
    sizes.unshift(<option key={0} value="SELECT SIZE" disabled>SELECT SIZE</option>);
    return <select onClick={() => {this.props.postTrackInteractions('Select Size', 'Product Buttons')}} id="sizeSelect" onChange={this.handleChange} defaultValue={'SELECT SIZE'}>{sizes}
    </select>;
  }

  handleChange(event) {
    // get quantity available for selected size
    this.setState({ quantity: event.target.options[event.target.selectedIndex].dataset.qty });
  }

  displayQty(qty) {
    const MAX_QTY = 15;
    qty = qty < MAX_QTY ? qty : MAX_QTY;
    let amounts = [];
    for (let i = 0; i <= qty; i++) {
      amounts.push(<option key={i} value={i}>{i}</option>)
    }
    return <select id='qtySelect' defaultValue='0'>{amounts}</select>
  }

  render() {
    return (
      <div id="productButtons" data-testid="overview-buttons">
        {this.props.loaded ?
          <div>
            {this.getSizes(this.props.selected.skus)}
            {this.displayQty(this.state.quantity)}
            <button id="bagBtn" onClick={() => {this.props.postTrackInteractions('Add to bag', 'Product Buttons')}}>ADD TO BAG</button>
            <button id="favBtn" onClick={this.props.favoriteItem} >*</button>
          </div>
        : <div>Loading Data</div>}
      </div>
    )
  }
};

export default ClickTracker(ProductButtons);
