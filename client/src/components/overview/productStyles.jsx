import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import {FaRegCheckCircle} from 'react-icons/fa';

const selected = {
  border: '2px solid #ddd',
  boxShadow: 'inset 0 0 6px 2px rgba(0, 0, 0, 0.4), 1px 1px 4px 2px rgba(0, 0, 0, 0.6)'
};

class ProductSyles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.default
    };
    this.selectStyle = this.selectStyle.bind(this);
  }

  selectStyle(event) {
    console.log('selectStyle fired')
    let id = parseInt(event.target.id);
    this.setState({ id: id });
    this.props.update(event);
  }

  makeStyles = (styles, update) => {
    let list = styles.map((style) => {
      return <div className={'styleBtnWrapper'}>{style.style_id === this.props.default ? <FaRegCheckCircle className={'styleCheck'} /> : ''}<div className={'styleBtn'} style={style.style_id === this.props.default ? selected : {}} key={style.style_id} id={style.style_id} onClick={update}> <img className={'styleBtnImg'} src={style.photos[0].thumbnail_url} /></div></div>
    })
    return <div id="styleButtons">{list}</div>;
  }

  render() {
    return (
      <div id="stylesContainer" data-testid="overview-styles">
        <span onClick={() => {this.props.postTrackInteractions('Style Name', 'Product Styles')}}><strong>{'STYLE >'}</strong> {this.props.name.toUpperCase()}</span>
          {
            this.props.loaded ?
              this.makeStyles(this.props.styles, this.selectStyle)
            : <span>Style Options Loading</span>
          }
      </div>
    )
  }
}

export default ClickTracker(ProductSyles);
