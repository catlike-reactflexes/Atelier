import React from 'react';
import ReactDOM from 'react-dom';

import Overview from './components/overview/overview.jsx';
import QuesAnsMain from './components/questionAnswer/1QuesAnsMain.jsx';
import RelatedProducts from './components/relatedproducts/RelatedProducts.jsx';
import Reviews from './components/reviews/ReviewApp.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 47421,
      quesAns: []
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this)
  }

  handleProductUpdate(id) {
    this.setState({ productId: id });
  }

  handleProductUpdate(id) {
    this.setState({
      productId: id
    })
  }

  fetchQuestionAnswer() {
    fetch('/api/qa')
      .then(response => response.json())
      .then(res => this.setState({ quesAns: res }));

  }

  componentDidMount() {
    this.fetchQuestionAnswer();

  }


  render() {

    return (
      <div>
        <div>Header Placeholder</div>
        <Overview productUpdate={this.handleProductUpdate} id={this.state.productId} />
        <RelatedProducts id={this.state.productId} productUpdate={this.handleProductUpdate} />
        <QuesAnsMain quesAns={this.state.quesAns} />
        <Reviews />
      </div >
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));
