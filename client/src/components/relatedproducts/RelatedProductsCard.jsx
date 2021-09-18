import React from 'react';


class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);

  }


  //set star to absolute position within the card element
  render() {
    return (
      <li className="relatedProductsItems" >
        <div className="card">
          <div className="imageContainer">
            <img className="relatedProductImg" src={this.props.image}></img>
          </div>
          <p className="category">{this.props.category}</p>
          <p className="productName">{this.props.name}</p>
          <p className="price">${this.props.price}</p>
        </div>
      </li >
    )
  }

}

export default RelatedProductsCard;
