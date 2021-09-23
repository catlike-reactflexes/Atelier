import React from 'react';
import ComparisonModalItem from './ComparisonModalItem.jsx';


class ComparisonModalList extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    let features = this.props.productFeatures.map((item, index) => {
      return <ComparisonModalItem feature={item.feature} value={item.value} key={index} name={this.props.name}
        overviewProduct={this.props.overviewProduct} />
    });
    return (
      <div style={RPOVERLAY_STYLES}>
        <table style={MODAL_STYLES}>
          {features}
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

export default ComparisonModalList;