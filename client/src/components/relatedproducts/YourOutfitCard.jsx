import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaStar, FaWindowClose } from 'react-icons/fa';
import Stars from './Stars.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closeClicked: false
    }
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  removeFavorite() {
    let outfitIds = JSON.parse(localStorage.getItem("myOutfit"));
    let index = outfitIds.data.indexOf(this.props.id);
    outfitIds.data.splice(index, 1);
    localStorage.setItem("myOutfit", JSON.stringify(outfitIds));
    this.props.updateOutfitData(outfitIds);

    this.setState({
      closeClicked: true
    })

  }



  render() {
    return (
      <div>
        <li className="relatedProductsItems">
          <div className="card">
            <div className="imageContainer">
              <FaWindowClose id="windowClose" onClick={this.removeFavorite} />
              <img className="relatedProductImg" src={this.props.image.results[0].photos[0].thumbnail_url}></img>
            </div>
            <p className="category">{this.props.category}</p>
            <p className="productName">{this.props.name}</p>
            <p className="price">${Number(this.props.price).toFixed()}</p>
            <Stars id={this.props.id} />
          </div>
        </li >

      </div>

    )
  }


}


export default ClickTracker(YourOutfitCard);
