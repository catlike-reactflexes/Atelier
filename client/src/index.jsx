import React from 'react';
import ReactDOM from 'react-dom';

import Overview from './components/overview/overview.jsx';
import QaMain from './components/qa/QaMain.jsx';
import RelatedProducts from './components/relatedproducts/RelatedProducts.jsx';

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
        <Overview />
        <RelatedProducts />
        <QaMain />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
