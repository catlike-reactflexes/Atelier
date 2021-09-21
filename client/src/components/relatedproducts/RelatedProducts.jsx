import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import RelatedProductsCard from './RelatedProductsCard.jsx';
import ComparisonModalItem from './ComparisonModalItem.jsx';
import axios from 'axios';


class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsData: [],
      relatedProductsStyles: [],
      defaultImages: [],
      yourOutfitData: [],
      defaultProductId: 47421,
      modalIsVisible: false
    }
    this.getRelatedProductsData = this.getRelatedProductsData.bind(this);
    this.getRelatedProductsStyles = this.getRelatedProductsStyles.bind(this);
    this.getYourOutfitData = this.getYourOutfitData.bind(this);
    this.showComparisonModal = this.showComparisonModal.bind(this);
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

  getRelatedProductsStyles() {
    axios.get('/relatedProductStyles', {
      params: {
        defaultProductId: this.state.defaultProductId
      }
    })
      .then((relatedProductsStyles) => {
        console.log('success getting related products styles in related products client index: ', relatedProductsStyles.data);
        let imagesArray = [];
        let defaultImagesArray = [];
        let styleData = relatedProductsStyles.data
        for (var i = 0; i < styleData.length; i++) {
          let stylesDataItem = relatedProductsStyles.data[i].results[0].photos;
          imagesArray.push(stylesDataItem);
        }
        for (var i = 0; i < imagesArray.length; i++) {
          defaultImagesArray.push(imagesArray[i][0].thumbnail_url);
        }
        this.setState({
          defaultImages: defaultImagesArray
        })
      })
      .catch((error) => {
        console.log('error getting related products styles in related products client index: ', error);
      })
  }

  getYourOutfitData() {
  }

  showComparisonModal() {
    console.log('related product card clicked');
  }

  componentDidMount() {
    this.getRelatedProductsData();
    this.getRelatedProductsStyles();
  }




  render() {
    return (
      <div>
        <h3>Related Products</h3>
        <RelatedProductsList
          productData={this.state.relatedProductsData}
          imageData={this.state.defaultImages}
          showComparisonModal={this.showComparisonModal} />
        <h3>Your Outfit</h3>
        <YourOutfitList dummyData={this.state.relatedProductsData} />
      </div>
    )
  }





}

export default RelatedProducts;
