import React from 'react';


class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <li className="relatedProductsItems" key={this.props.index} >
          <div className="card">
            <img src="https://via.placeholder.com/150"></img>
            <p className="category">{this.props.category}</p>
            <h4>{this.props.name}</h4>
            <p className="price">${this.props.price}.00</p>
            <p>Some text about the product...</p>
          </div>
        </li>
      </div>
    )
  }

}

export default RelatedProductsCard;

