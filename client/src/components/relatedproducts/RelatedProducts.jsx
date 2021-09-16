import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import axios from 'axios';


class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsData: [],
      yourOutfitData: [],
      defaultProductId: 47421
    }
    this.getRelatedProductsData = this.getRelatedProductsData.bind(this);
    this.getYourOutfitData = this.getYourOutfitData.bind(this);
  }


  getRelatedProductsData() {
    axios.get('/relatedProducts', {
      params: {
        defaultProductId: this.state.defaultProductId
      }
    })
      .then((relatedProductsData) => {
        console.log('success getting related products data in related products client index: ', relatedProductsData.data);
        this.setState({
          relatedProductsData: relatedProductsData.data
        })
      })
      .catch((error) => {
        console.log('error getting related products data in related products client index: ', error);
      })
  }

  getYourOutfitData() {


  }

  componentDidMount() {
    this.getRelatedProductsData();

  }




  render() {
    return (
      <div>
        <h3>Related Products</h3>
        <RelatedProductsList dummyData={this.state.relatedProductsData} />
        <h3>Your Outfit</h3>
        <YourOutfitList dummyData={this.state.relatedProductsData} />
      </div>
    )
  }





}

export default RelatedProducts;
