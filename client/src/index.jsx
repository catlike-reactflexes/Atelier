import React from 'react';
import ReactDOM from 'react-dom';

import Overview from './components/overview/overview.jsx';
import QaMain from './components/qa/QaMain.jsx';
import RelatedProducts from './components/relatedproducts/RelatedProducts.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 47421
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this);
  }

  handleProductUpdate(id) {
    this.setState({
      productId: id
    })
  }

  render() {
    return (
      <div>
        <div>Header Placeholder</div>
        <Overview />
        <RelatedProducts id={this.state.productId} productUpdate={this.handleProductUpdate} />
        <QaMain />
      </div>

    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
