import React from 'react';


class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <li className="relatedProductsItems" >
        <div className="card">
          <img src="https://images.unsplash.com/photo-1499013819532-e4ff41b00669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"></img>
          <p className="category">{this.props.category}</p>
          <h4>{this.props.name}</h4>
          <p className="price">${this.props.price}</p>
          <p>{this.props.description}</p>
        </div>
      </li >
    )
  }

}

export default RelatedProductsCard;
