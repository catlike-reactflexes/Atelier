import React from 'react';
import ComparisonModalItem from './ComparisonModalItem.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class ComparisonModalList extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    const totalFeatures = [...this.props.productFeatures, ...this.props.overviewProduct.features];
    const uniqueFeatures = Array.from(new Set([...totalFeatures]));
    let features = uniqueFeatures.map((item, index) => {
      return <ComparisonModalItem feature={item.feature} value={item.value} key={index}
        productFeatures={this.props.productFeatures}
        overviewProductFeatures={this.props.overviewProduct.features} />
    });
    return (
      <div style={RPOVERLAY_STYLES} onClick={() => this.props.postTrackInteractions('comparison modal', 'Related Products')}>
        <table style={MODAL_STYLES}>
          <tbody>
            <tr>
              <th>Comparing</th>
            </tr>
            <tr>
              <th>{this.props.overviewProduct.name}</th>
              <th></th>
              <th>{this.props.name}</th>
            </tr>
            {features}
          </tbody>
        </table>
      </div>
    )
  }
}
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}
const RPOVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .4)',
  zIndex: 1000
}

export default ClickTracker(ComparisonModalList);