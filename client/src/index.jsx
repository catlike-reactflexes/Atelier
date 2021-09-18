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
      quesAns:[]
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this)
  }

  // handleProductUpdate(id) {
  //   this.setState({ productId: id});
  // }

  handleProductUpdate(id) {
    this.setState({
      productId: id
    })
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
        <Overview productUpdate={this.handleProductUpdate} id={this.state.productId}/>
        <RelatedProducts id={this.state.productId} productUpdate={this.handleProductUpdate} />
        <QuesAnsMain productUpdate={this.handleProductUpdate} quesAns={this.state.quesAns} id={this.state.productId}/>
        <Reviews />
      </div >
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));
