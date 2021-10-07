import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import RelatedProductsCard from './RelatedProductsCard.jsx';
import ComparisonModalItem from './ComparisonModalItem.jsx';
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsData: [],
      relatedProductsStyles: [],
      defaultImages: [],
      yourOutfitData: [],
      yourOutfitImageURLs: [],
      defaultProductId: 47421,
      overviewProductData: {
        "id": 47421,
        "campus": "hr-rpp",
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140.00",
        "created_at": "2021-08-26T20:30:48.129Z",
        "updated_at": "2021-08-26T20:30:48.129Z",
        "features": [
          {
            "feature": "Fabric",
            "value": "Canvas"
          },
          {
            "feature": "Buttons",
            "value": "Brass"
          }
        ]
      }
    }
    this.getRelatedProductsData = this.getRelatedProductsData.bind(this);
    this.getRelatedProductsStyles = this.getRelatedProductsStyles.bind(this);
    this.getYourOutfitData = this.getYourOutfitData.bind(this);
    this.getYourOutfitData = this.getYourOutfitData.bind(this);
    this.getYourOutfitStyles = this.getYourOutfitStyles.bind(this);
  }


  getRelatedProductsData() {
    axios.get('/relatedProducts', {
      params: {
        defaultProductId: this.state.defaultProductId
      }
    })
      .then((relatedProductsData) => {
        //console.log('success getting related products data in related products client index: ', relatedProductsData.data);
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
        //console.log('success getting related products styles in related products client index: ', relatedProductsStyles.data);
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
    return new Promise((resolve, reject) => {
      if (this.props.outfit.data.length > 0) {
        let favorites = JSON.stringify(this.props.outfit.data);
        //console.log('local storage after parse in related: ', favorites);
        axios.get('/yourOutfitProductData', {
          params: {
            yourOutfitIds: favorites
          }
        })
          .then((yourOutfitData) => {
            //console.log('success getting outfit data on client: ', yourOutfitData.data);
            resolve(yourOutfitData.data);
            // this.setState({
            //   yourOutfitData: yourOutfitData.data
            // })
          })
          .catch((error) => {
            console.log('error getting youroutfitData on client: ', error);
            reject(error);
          })
      }
    })
  }

  getYourOutfitStyles() {
    return new Promise((resolve, reject) => {
      //console.log('props data: ', this.props.outfit.data)
      if (this.props.outfit.data.length > 0) {
        let favorites = JSON.stringify(this.props.outfit.data);
        axios.get('/yourOutfitStyles', {
          params: {
            yourOutfitIds: favorites
          }
        })
          .then((yourOutfitStyles) => {
            //console.log('success getting outfit styles on client: ', yourOutfitStyles.data);
            resolve(yourOutfitStyles.data);
            // this.setState({
            //   yourOutfitImageURLs: yourOutfitStyles.data
            // })
          })
          .catch((error) => {
            console.log('error getting youroutfitData on client: ', error);
            reject(error);
          })
      }
    })
  }

  componentDidUpdate(prevProps) {
    //componentDidUpdate(prevProps, prevState, snapshot)
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    if (JSON.stringify(this.props.outfit.data) !== JSON.stringify(prevProps.outfit.data)) {
      //console.log('component did update ran');
      let tempOutfitData = [];
      this.getYourOutfitData()
        .then((outfitData) => {
          tempOutfitData = outfitData
          return this.getYourOutfitStyles()
        })
        .then((outfitStyles) => {
          this.setState({
            yourOutfitData: tempOutfitData,
            yourOutfitImageURLs: outfitStyles
          })
        })
    }
  }

  componentDidMount() {
    this.getRelatedProductsData();
    this.getRelatedProductsStyles();
    let tempOutfitData = [];
    this.getYourOutfitData()
      .then((outfitData) => {
        tempOutfitData = outfitData
        return this.getYourOutfitStyles()
      })
      .then((outfitStyles) => {
        this.setState({
          yourOutfitData: tempOutfitData,
          yourOutfitImageURLs: outfitStyles
        })
      })
  }




  render() {

    return (
      <div>
        <span onClick={() => this.props.postTrackInteractions('label', 'Related Products')}>Related Products</span>
        <RelatedProductsList
          productData={this.state.relatedProductsData}
          imageData={this.state.defaultImages}
          overviewProduct={this.state.overviewProductData} />
        <span onClick={() => this.props.postTrackInteractions('label', 'Related Products')}>Your Outfit</span>
        <YourOutfitList
          yourOutfitData={this.state.yourOutfitData} yourOutfitImageURLs={this.state.yourOutfitImageURLs}
          updateOutfitData={this.props.updateOutfitData}
          outfit={this.props.outfit} />
      </div>
    )
  }





}

export default ClickTracker(RelatedProducts);
