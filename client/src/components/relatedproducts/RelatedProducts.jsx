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
          overviewProduct={this.state.overviewProductData} />
        <h3>Your Outfit</h3>
        <YourOutfitList
          dummyData={this.state.relatedProductsData} />
      </div>
    )
  }





}

export default RelatedProducts;
