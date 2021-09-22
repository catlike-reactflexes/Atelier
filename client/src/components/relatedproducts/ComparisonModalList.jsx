import React from 'react';
import ComparisonModalItem from './ComparisonModalItem.jsx';


class ComparisonModalList extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log('props in the modal list: ', this.props.overviewProductData);
    let features = this.props.productFeatures.map((item, index) => {
      return <ComparisonModalItem feature={item.feature} value={item.value} key={index} name={this.props.name}
        overviewProduct={this.props.overviewProduct} />
    });
    return (
      <table >
        {features}
      </table>
    )
  }
}

export default ComparisonModalList;