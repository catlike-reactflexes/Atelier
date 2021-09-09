import React from 'react';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    };
  }

  render() {
    return (
      <div id="overview">
        <h1>This is the product overview component</h1>
      </div>
    );
  }
}

export default Overview;
