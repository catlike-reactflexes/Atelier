import React from 'react';
import ProductImage from './productImage.jsx';
import ProductDetails from './productDetails.jsx';
import ProductSyles from './productStyles.jsx';
import ProductButtons from './productButtons.jsx';
import ProductDescription from './productDescription.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import axios from 'axios';


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.id,
      productDetails: {},
      productStyles: [],
      styleId: 286894,
      selectedStyle: null,
      mainId: 0,
      styleName: '',
      stylePhotos: null,
      detailsLoaded: false,
      loaded: false,
      expandImage: false,
      mainUrl: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    };
    this.getProductStyles = this.getProductStyles.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.saveToOutfit = this.saveToOutfit.bind(this);
    this.expandMainImage = this.expandMainImage.bind(this);
    this.updateMainImg = this.updateMainImg.bind(this);
  }

  componentDidMount() {
    let id = this.state.productId;
    axios({
      method: 'get',
      url: '/product',
      params: { id: id }
    }).then((response) => {
      let data = response.data;
      this.setState({ productDetails: data, detailsLoaded: true });
    }).catch((error) => {
      console.log('Error calling product API: ', error);
    }).then(() => {
      this.props.productUpdate({ id: this.state.productId, name: this.state.productDetails.name, features: this.state.productDetails.features });
      this.getProductStyles(id);
    })
  }

  getProductStyles(id) {
    axios({
      method: 'get',
      url: '/styles',
      params: { id: id }
    }).then((response) => {
      let results = response.data.results;
      let selected = null;
      let photos = [];
      let name = '';
      for (let i = 0; i < results.length; i++) {
        if (results[i].style_id === this.state.styleId) {
          photos = results[i].photos;
          name = results[i].name;
          selected = results[i];
          break;
        }
      }
      this.setState({ productStyles: results, selectedStyle: selected, styleName: name, stylePhotos: photos, stylesLoaded: true });
    }).catch((error) => {
      console.log('Error getting styles: ', error);
    })
  }

  updateMainImg(event) {
    let selection = event.target.id;
    // console.log(`handle change selection: ${selection}, state photos: ${this.state.stylePhotos}`);
    let url = this.state.stylePhotos[selection].url;
    this.setState({ mainUrl: url, mainId: selection });
  }

  updateStyle(event) {
    this.props.postTrackInteractions('Style Option', 'Product Styles');
    event.preventDefault();
    //this.setState({ stylesLoaded: false })
    let id = parseInt(event.target.id);
    let styles = this.state.productStyles;
    let selected = null;
    let photos = [];
    let name = '';
    let main = '';
    // console.log('styles: ', styles)
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].style_id === id) {
        selected = styles[i];
        photos = styles[i].photos;
        name = styles[i].name;
        main = photos[this.state.mainId].url;
        break;
      }
    }
    this.setState({ styleId: id, selectedStyle: selected, styleName: name, stylePhotos: photos, mainUrl: main });
  }

  saveToOutfit() {
    this.props.postTrackInteractions('Add to outfit', 'Product Buttons');
    let id = this.state.productId;
    let outfitData;
    if (localStorage.getItem('myOutfit') === null) {
      outfitData = [];
    } else {
      outfitData = localStorage.getItem('myOutfit');
    }
    if (!outfitData.includes(id)) {
      outfitData.push(id);
    }
    //I had to JSON.stringify this to get the data to save in the correct format
    localStorage.setItem('myOutfit', JSON.stringify(outfitData));
    console.log('your outfit data on overview: ', localStorage);
  }

  expandMainImage(event) {
    // console.log('Expand fired.')
    let flag = this.state.expandImage;
    this.setState({ expandImage: !flag });
  }

  render() {
    return (
      <div id="overview" data-testid="overview-element">
        <ProductImage photos={this.state.stylePhotos} loaded={this.state.stylesLoaded} clickHandler={this.expandMainImage} expand={this.state.expandImage} mainImg={this.state.mainUrl} updateMain={this.updateMainImg} />
        {this.state.expandImage ?
          <div style={{display:'none'}}></div>
        : <div className="sidebar column-flex">
            <ProductDetails rating={this.props.rating} name={this.state.productDetails.name} category={this.state.productDetails.category} price={this.state.productDetails.default_price} loaded={this.state.detailsLoaded} />
            <ProductSyles name={this.state.styleName} styles={this.state.productStyles} update={this.updateStyle} loaded={this.state.stylesLoaded} />
            <ProductButtons selected={this.state.selectedStyle} favoriteItem={this.saveToOutfit} loaded={this.state.stylesLoaded} />
          </div>
        }
        <ProductDescription slogan={this.state.productDetails.slogan} description={this.state.productDetails.description} features={this.state.productDetails.features} loaded={this.state.detailsLoaded} />
      </div>
    );
  }
}

export default ClickTracker(Overview);
