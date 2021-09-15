import React from 'react';


class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="relatedProductsItems" >
        <div className="card">
          <img src="https://via.placeholder.com/150"></img>
          <p className="category">{this.props.category}</p>
          <h4>{this.props.name}</h4>
          <p className="price">${this.props.price}</p>
          <p>{this.props.description}</p>
        </div>
      </li>
    )
  }

}

export default RelatedProductsCard;

