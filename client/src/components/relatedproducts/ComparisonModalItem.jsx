import React from 'react';


class ComparisonModalItem extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    return (
      <tbody>
        <tr>
          <th>{this.props.name}</th>
          <th></th>
          <th>{this.props.overviewProduct.name}</th>
        </tr>
        <tr>
          <td>{this.props.value}</td>
          <td>{this.props.feature}</td>
          <td>{this.props.overviewProduct.features.feature}</td>
        </tr>
      </tbody>

    )
  }
}



export default ComparisonModalItem;