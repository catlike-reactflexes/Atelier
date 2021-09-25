import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';


class ProductSyles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeStyles = (styles, update) => {
    let list = styles.map((style) => {
      // style.url -> src ?
      return <div className={'styleBtn'} key={style.style_id}><img id={style.style_id} src={style.photos[0].thumbnail_url} onClick={update} /></div>
    })
    return <div id="styleButtons">{list}</div>;
  }

  render() {
    return (
      <div id="stylesContainer" data-testid="overview-styles">
        <span onClick={() => {this.props.postTrackInteractions('Style Name', 'Product Styles')}}><em>STYLE ></em> {this.props.name.toUpperCase()}</span>
          {
            this.props.loaded ?
              this.makeStyles(this.props.styles, this.props.update)
            : <span>Style Options Loading</span>
          }
      </div>
    )
  }
}

export default ClickTracker(ProductSyles);
