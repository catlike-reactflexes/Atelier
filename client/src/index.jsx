import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview/overview.jsx';
import QuesAnsMain from './components/questionAnswer/1QuesAnsMain.jsx';
import RelatedProducts from './components/relatedproducts/RelatedProducts.jsx';
import Reviews from './components/reviews/ReviewApp.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 47421,
      productName:'Camo Onesie',
      quesAns: []
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this)
  }

  handleProductUpdate(data) {
    let update = {}
    if (data.id) {
      if (data.name) {
        this.setState({ productId: data.id, productName: data.name });
      } else {
        this.setState({ productId: data.id });
      }
    } else if (data.name) {
      this.setState({ productName: data.name })
    }
  }


  fetchQuestionAnswer() {
    const {productId} = this.state;
    axios.get(`/api/qa/id=${productId}`, {
      params: {
        product_id: productId
      }
    })
      .then(data => {
        this.setState({ quesAns: data.data })
      })
      .catch(error => {
        console.error(error)
      })
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
        <QuesAnsMain
          productUpdate={this.handleProductUpdate}
          quesAns={this.state.quesAns}
          id={this.state.productId}
          productName={this.state.productName}
        />
        <Reviews id={this.state.productId}/>
      </div >
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));
