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
      productName: 'Camo Onesie',
      productFeatures: [],
      quesAns: [],
      totalRating: 0
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this)
    this.handleQAUpdate = this.handleQAUpdate.bind(this)
    this.getRatingAverage = this.getRatingAverage.bind(this)
  }

  getRatingAverage() {
    return axios.get('/reviewratings', {
      params: {
       productID: this.state.productId,
       count: 100
     }
   })
     .then(arrayOfReviews => {
       let sum = 0
       for (var i = 0; i < arrayOfReviews.data.results.length; i++) {
         // console.log('rating: ', arrayOfReviews.data.results[i].rating)
         sum = sum + arrayOfReviews.data.results[i].rating
       }
       let average = sum / arrayOfReviews.data.results.length
       // console.log('this is the average: ', average)
       this.setState({totalRating: average})
     })
     .catch(error => {
       console.log('get error', error)
       throw error
     })
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

    this.setState({ quesAns: [{ updateList }] })
    // console.log('UpdateLIST--->', updateList);
  }

  fetchQuestionAnswer() {
    const { productId } = this.state;
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
    this.getRatingAverage()
  }

  render() {
    const { quesAns } = this.state;

    return (
      <div>
        <div>Header Placeholder</div>
          <Overview productUpdate={this.handleProductUpdate} id={this.state.productId} rating={this.state.totalRating} />
          <RelatedProducts id={this.state.productId} productUpdate={this.handleProductUpdate} />
          {quesAns.length > 0 && <QuesAnsMain
            handleQAUpdate={this.handleQAUpdate}
            productUpdate={this.handleProductUpdate}
            quesAns={this.state.quesAns}
            id={this.state.productId}
            productName={this.state.productName}
          />}
          <Reviews id={this.state.productId} productName = {this.state.productName}/>
      </div >
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));
