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
      styleId: null,
      selectedStyle: null,
      mainIndex: 0,
      styleName: '',
      stylePhotos: null,
      detailsLoaded: false,
      loaded: false,
      expandImage: false,
      mainUrl: ''
    };
    this.getProductStyles = this.getProductStyles.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.saveToOutfit = this.saveToOutfit.bind(this);
    this.expandMainImage = this.expandMainImage.bind(this);
    this.updateMainImg = this.updateMainImg.bind(this);
    this.updateMainIndex = this.updateMainIndex.bind(this);
  }

  componentDidMount() {
    let id = this.state.productId;
    axios({
      method: 'get',
      url: '/product',
      params: { id: id }
    }).then((response) => {
      // console.log('product get res: ', response);
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
      console.log('style res: ', response);
      let results = response.data.results;
      let selected = null;
      let styleId = null;
      let photos = [];
      let url = '';
      let name = '';
      for (let i = 0; i < results.length; i++) {
        if (results[i]['default?']) {
          styleId = results[i].style_id;
          photos = results[i].photos;
          url = photos[this.state.mainIndex].url;
          name = results[i].name;
          selected = results[i];
          break;
        }
      }
      this.setState({ productStyles: results, selectedStyle: selected, styleId: styleId, styleName: name, stylePhotos: photos, mainUrl: url, stylesLoaded: true });
    }).catch((error) => {
      console.log('Error getting styles: ', error);
    })
  }

  updateMainImg(event) {
    let selection = event.target.id;
    // console.log(`handle change selection: ${selection}, state photos: ${this.state.stylePhotos}`);
    let url = this.state.stylePhotos[selection].url;
    this.setState({ mainUrl: url, mainIndex: selection });
  }

  updateMainIndex(num) {
    let url = this.state.stylePhotos[num].url;
    this.setState({ mainUrl: url, mainIndex: num });
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
        main = photos[this.state.mainIndex].url;
        break;
      }
    }
    this.setState({ styleId: id, selectedStyle: selected, styleName: name, stylePhotos: photos, mainUrl: main });
  }

  saveToOutfit() {
    this.props.postTrackInteractions('Add to outfit', 'Product Buttons');
    let id = this.state.productId;
    let outfitData = { data: [] };
    if (localStorage.getItem('myOutfit') === null) {
      outfitData.data = [];
    } else {
      outfitData = JSON.parse(localStorage.getItem('myOutfit'));
    }
    if (!outfitData.data.includes(id)) {
      outfitData.data.push(id);
    }
    localStorage.setItem('myOutfit', JSON.stringify(outfitData));
    this.props.updateOutfitData(outfitData);
  }

  expandMainImage(event) {
    // console.log('Expand fired.')
    let flag = this.state.expandImage;
    this.setState({ expandImage: !flag });
  }

  render() {
    return (
      <div id="overview" data-testid="overview-element">
        <ProductImage photos={this.state.stylePhotos} loaded={this.state.stylesLoaded} clickHandler={this.expandMainImage} expand={this.state.expandImage} mainImg={this.state.mainUrl} updateMain={this.updateMainImg} updateIndex={this.updateMainIndex} index={this.state.mainIndex} />
        {this.state.expandImage ?
          <div style={{ display: 'none' }}></div>
          : <div className="sidebar column-flex">
            <ProductDetails rating={this.props.rating} name={this.state.productDetails.name} category={this.state.productDetails.category} price={this.state.productDetails.default_price} loaded={this.state.detailsLoaded} />
            <ProductSyles name={this.state.styleName} styles={this.state.productStyles} default={this.state.styleId} update={this.updateStyle} loaded={this.state.stylesLoaded} />
            <ProductButtons selected={this.state.selectedStyle} favoriteItem={this.saveToOutfit} loaded={this.state.stylesLoaded} />
          </div>
        }
        <ProductDescription slogan={this.state.productDetails.slogan} description={this.state.productDetails.description} features={this.state.productDetails.features} loaded={this.state.detailsLoaded} />
      </div>
    );
  }
}

export default ClickTracker(Overview);
