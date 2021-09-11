import React from 'react';

const ProductButtons = (props) => {
  return (
    <div id="productButtons">
      <div>
        <select>
          <option>SELECT SIZE</option>
        </select>
        <select>
          <option>1</option>
        </select>
        <button>ADD TO BAG</button>
        <button>*</button>
      </div>
    </div>
  )
}

export default ProductButtons;
