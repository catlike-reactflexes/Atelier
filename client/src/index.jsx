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
      productFeatures: [],
      reviewValue: null,
      quesAns: []
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this)
    this.handleQAUpdate = this.handleQAUpdate.bind(this)
  }

  handleProductUpdate(data) {
    let update = {}
    if (data.id && data.name) {
      if (data.features) {
        this.setState({ productId: data.id, productName: data.name, productFeatures: data.features });
      } else {
        this.setState({ productId: data.id, productName: data.name });
      }
      // window.history.replaceState(null, '', `/product?id=${data.id}`);
    } else {
      console.error('Unhandled data in update: ', data);
    }
  }

  handleQAUpdate(updateList) {

    this.setState({quesAns: [{updateList}]})
    // console.log('UpdateLIST--->', updateList);
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
    const {quesAns} = this.state;

    return (
      <div>
        <div>Header Placeholder</div>
        <Overview productUpdate={this.handleProductUpdate} id={this.state.productId} />
        <RelatedProducts id={this.state.productId} productUpdate={this.handleProductUpdate} />
        {quesAns.length > 0 &&  <QuesAnsMain
          handleQAUpdate = {this.handleQAUpdate}
          productUpdate={this.handleProductUpdate}
          quesAns={this.state.quesAns}
          id={this.state.productId}
          productName={this.state.productName}
        /> }
       <Reviews id={this.state.productId}/>
      </div >
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));
