import React from 'react';


class ComparisonModalItem extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    let overviewHasFeature = false;
    for (var i = 0; i < this.props.overviewProductFeatures.length; i++) {
      let currentFeature = this.props.overviewProductFeatures[i];
      if (currentFeature.feature === this.props.feature &&
        currentFeature.value === this.props.value) {
        overviewHasFeature = true;
      }
    }

    let productHasFeature = false;
    for (var i = 0; i < this.props.productFeatures.length; i++) {
      let currentFeature = this.props.productFeatures[i];
      if (currentFeature.feature === this.props.feature &&
        currentFeature.value === this.props.value) {
        productHasFeature = true;
      }
    }

    return (
      <tr>

        <td>
          {overviewHasFeature && "✓"}
        </td>
        <td>{this.props.feature} : {this.props.value}</td>
        <td>
          {productHasFeature && "✓"}
        </td>
      </tr>


    )
  }
}



export default ComparisonModalItem;