import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import RelatedProductsCard from './RelatedProductsCard.jsx';
class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsData: [
        {
          "id": 1,
          "name": "Camo Onesie",
          "slogan": "Blend in to your crowd",
          "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          "category": "Jackets",
          "default_price": "140"
        },
        {
          "id": 2,
          "name": "Bright Future Sunglasses",
          "slogan": "You've got to wear shades",
          "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
          "category": "Accessories",
          "default_price": "69"
        },
        {
          "id": 1,
          "name": "Camo Onesie",
          "slogan": "Blend in to your crowd",
          "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          "category": "Jackets",
          "default_price": "140"
        },
        {
          "id": 2,
          "name": "Bright Future Sunglasses",
          "slogan": "You've got to wear shades",
          "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
          "category": "Accessories",
          "default_price": "69"
        },
        {
          "id": 3,
          "name": "Morning Joggers",
          "slogan": "Make yourself a morning person",
          "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
          "category": "Pants",
          "default_price": "40"
        }
      ],
      yourOutfitData: []
    }
    this.getRelatedProductsData = this.getRelatedProductsData.bind(this);
    this.getYourOutfitData = this.getYourOutfitData.bind(this);
  }


  getRelatedProductsData() {

  }

  getYourOutfitData() {


  }

  componentDidMount() {


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