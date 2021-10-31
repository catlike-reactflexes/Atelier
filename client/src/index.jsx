import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview/overview.jsx';
import QuesAnsMain from './components/questionAnswer/1QuesAnsMain.jsx';
import RelatedProducts from './components/relatedproducts/RelatedProducts.jsx';
import Reviews from './components/reviews/ReviewApp.jsx';
import { FaSearch } from 'react-icons/fa';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: Number((window.location.pathname.split('/')[1] || 47421)),
      productName: 'Camo Onesie',
      productFeatures: [],
      quesAns: [],
      totalRating: 0,
      numOfReviews: 0,
      outfit: JSON.parse(localStorage.getItem("myOutfit")) || { data: [] }
    }
    this.handleProductUpdate = this.handleProductUpdate.bind(this)
    this.handleQAUpdate = this.handleQAUpdate.bind(this)
    this.getRatingAverage = this.getRatingAverage.bind(this)
    this.updateOutfitData = this.updateOutfitData.bind(this)
  }

  updateOutfitData(data) {
    this.setState({
      outfit: data
    })
  }

  getRatingAverage() {
    return axios.get('/reviewratings', {
      params: {
        productID: this.state.productId,
        count: 1000
      }
    })
    .then(arrayOfReviews => {
      let sum = 0
      for (var i = 0; i < arrayOfReviews.data.results.length; i++) {
        // console.log('rating: ', arrayOfReviews.data.results[i].rating)
        sum = sum + arrayOfReviews.data.results[i].rating
      }
      let average = sum / arrayOfReviews.data.results.length
      this.setState({numOfReviews: arrayOfReviews.data.results.length, totalRating: average})
    })
    .catch(error => {
      console.log('get error', error)
      throw error
    })
  }

  handleProductUpdate(data) {
    let update = {}
    if (data.id) {
      update.productId = data.id;
    }
    if (data.name) {
      update.productName = data.name;
    }
    if (data.features) {
      update.productFeatures = data.features;
    }
    if (Object.keys(update).length === 0) {
      console.error('Unhandled data in update: ', data);
    } else {
      this.setState(update);
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
        console.log('qa data', data.data)
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
        <header><span id="logo"></span><span id="searchBar"></span><FaSearch className={'searchBarIcon'} /></header>
        {<Overview productUpdate={this.handleProductUpdate} id={this.state.productId} rating={this.state.totalRating} updateOutfitData={this.updateOutfitData} />}
        <RelatedProducts id={this.state.productId} productUpdate={this.handleProductUpdate} updateOutfitData={this.updateOutfitData}
          outfit={this.state.outfit}
          rating={this.getRatingAverage} />


        {quesAns.length > 0 && <QuesAnsMain
          handleQAUpdate={this.handleQAUpdate}
          productUpdate={this.handleProductUpdate}
          quesAns={this.state.quesAns}
          id={this.state.productId}
          productName={this.state.productName}
        />}
         <Reviews totalRating = {this.state.totalRating} id={this.state.productId} productName = {this.state.productName} numOfReviews = {this.state.numOfReviews}/>
      </div >
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));
