import React from 'react';

const makeStyles = (styles) => {
  let list = styles.map((style) => {
    // style.url -> src ?
    return <div className={'styleBtn'} key={style.style_id}><img src={style.photos[0].thumbnail_url} /></div>
  })
  return <div id="styleButtons">{list}</div>;
}

const ProductSyles = (props) => {
  return (
    <div id="stylesContainer" data-testid="overview-styles">
      <span><em>STYLE ></em> SELECTED STYLE</span>
        {
          props.loaded ?
          makeStyles(props.styles)
          : <span>Style Options Loading</span>
        }
    </div>
  )
}

export default ProductSyles;
