import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';


const makeThumbnails = (photos, tracker, click) => {
  let thumbs = photos.map((photo, index) => {
    return <div className={'thumbWrapper'} key={'thumb' + index}><img onClick={(event) => {tracker('Style Photo Thumbnail', 'Main Image'); click(event);}} className={'styleThumb'} id={index} key={index} src={photo.thumbnail_url} /></div>
  });
  return thumbs;
}

const StyleThumbnails = (props) => {
  return (
    <div id="styleThumbnails" data-testid="overview-stylethumbs" >
      <div className="column-flex">
        {makeThumbnails(props.photos, props.postTrackInteractions, props.click)}
      </div>
    </div>
  )
}

export default ClickTracker(StyleThumbnails);
