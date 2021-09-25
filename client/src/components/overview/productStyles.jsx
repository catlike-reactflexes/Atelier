import React from 'react';

const makeStyles = (styles, update) => {
  let list = styles.map((style) => {
    // style.url -> src ?
    return <div className={'styleBtn'} key={style.style_id}><img id={style.style_id} src={style.photos[0].thumbnail_url} onClick={update} /></div>
  })
  return <div id="styleButtons">{list}</div>;
}

const ProductSyles = (props) => {
  return (
    <div id="stylesContainer" data-testid="overview-styles">
      <span><em>STYLE ></em> {props.name.toUpperCase()}</span>
        {
          props.loaded ?
            makeStyles(props.styles, props.update)
          : <span>Style Options Loading</span>
        }
    </div>
  )
}

export default ProductSyles;
