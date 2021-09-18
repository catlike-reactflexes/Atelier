import React from 'react';

const ProductButtons = (props) => {
  return (
    <div id="productButtons" data-testid="overview-buttons">
      <select id="sizeSelect">
        <option>SELECT SIZE</option>
      </select>
      <select id="qtySelect">
        <option>1</option>
      </select>
      <button id="bagBtn">ADD TO BAG</button>
      <button id="favBtn">*</button>
    </div>
  )
}

export default ProductButtons;
