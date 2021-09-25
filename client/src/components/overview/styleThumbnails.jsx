import React from 'react';

const makeThumbnails = (photos) => {
  let thumbs = photos.map((photo, index) => {
    return <div className={'thumbWrapper'} key={'thumb' + index}><img className={'styleThumb'} id={index} key={index} src={photo.thumbnail_url} /></div>
  });
  return thumbs;
}

const StyleThumbnails = (props) => {
  return (
    <div id="styleThumbnails" data-testid="overview-stylethumbs">
      <div className="column-flex">
        {makeThumbnails(props.photos)}
      </div>
    </div>
  )
}

export default StyleThumbnails;
