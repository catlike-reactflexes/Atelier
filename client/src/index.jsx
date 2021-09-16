import React from 'react';
import ReactDOM from 'react-dom';

import Overview from './components/overview/overview.jsx';
import QaMain from './components/qa/QaMain.jsx';
import RelatedProducts from './components/relatedproducts/RelatedProducts.jsx';
import Reviews from './components/reviews/ReviewApp.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Header Placeholder</div>
        <Overview />
        <RelatedProducts />
        <QaMain />
        <Reviews />
      </div>

    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
