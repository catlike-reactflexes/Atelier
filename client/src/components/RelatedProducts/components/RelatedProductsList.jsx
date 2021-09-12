import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let productItems = this.props.dummyData.map((item, index) => {
      return <RelatedProductsCard index={index} name={item.name} />
    })
    return (
      <ul id="relatedProductCards">
        {productItems}
      </ul>
    )
  }
}

export default RelatedProductsList;