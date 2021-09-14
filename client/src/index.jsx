import React from 'react';
import ReactDOM from 'react-dom';

import Overview from './components/overview/overview.jsx';
import QaMain from './components/qa/QaMain.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    }
  }

  render() {
    return (
      <div>
        <div>Header Placeholder</div>
        <Overview id={this.state.productId} />
        <QaMain />
      </div>
    );
  }

}

ReactDOM.render( <App />, document.getElementById('app'));
