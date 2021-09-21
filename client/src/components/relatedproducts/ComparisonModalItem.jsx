import React from 'react';


class ComparisonModalItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productCardActionButtonClicked: false
    }
    this.showComparisonModal = this.showComparisonModal.bind(this);
  }

  showComparisonModal() {
    let modal = document.getElementById('myModal');
    console.log('temp modal button clicked ------------------------');
    this.setState({
      productCardActionButtonClicked: true
    });
  }

  render() {
    return (
      <h1>The conditional worked</h1>

    )
  }
}

export default ComparisonModalItem;