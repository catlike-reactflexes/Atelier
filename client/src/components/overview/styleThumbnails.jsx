import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

const selected = {
  boxShadow: '0 0 0px 3px rgba(255, 255, 255, 1.0), 1px 1px 4px 2px rgba(0, 0, 0, 0.6)'
};

class StyleThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 0
    }
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage(event) {
    this.props.postTrackInteractions('Style Photo Thumbnail', 'Main Image');
    let id = parseInt(event.target.id);
    this.setState({ selection: id });
    this.props.click(event);
  }

  makeThumbnails(photos, click) {
    console.log(`state index: ${this.state.selection}`);
    let thumbs = photos.map((photo, index) => {
      console.log(`thumbnails index: ${index}`);
      return <div className={'thumbWrapper'} key={'thumb' + index} style={this.state.selection === index ? selected : {}}><img onClick={click} className={'styleThumb'} id={index} key={index} src={photo.thumbnail_url} /></div>
    });
    return thumbs;
  }

  render() {
    return (
      <div id="styleThumbnails" data-testid="overview-stylethumbs" >
        <div className="column-flex">
          {this.makeThumbnails(this.props.photos, this.selectImage)}
        </div>
      </div>
    )
  }
}

export default ClickTracker(StyleThumbnails);
