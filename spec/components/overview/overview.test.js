/**
 * @jest-environment jsdom
 */


// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
// import Fetch from '../fetch'

import Overview from '../../../client/src/components/overview/overview.jsx';
import ProductImage from '../../../client/src/components/overview/productImage.jsx';
import ProductDetails from '../../../client/src/components/overview/productDetails.jsx';
import ProductStyles from '../../../client/src/components/overview/productStyles.jsx';
import ProductButtons from '../../../client/src/components/overview/productButtons.jsx';
import ProductDescription from '../../../client/src/components/overview/productDescription.jsx';
import StyleThumbnails from '../../../client/src/components/overview/styleThumbnails.jsx';
import ClickTracker from '../../../client/src/components/trackInteractions/ClickTracker.jsx'

const server = setupServer(
  rest.get('/product', (req, res, ctx) => {
    return res(ctx.json({
      id: 47423,
      campus: 'hr-rpp',
      name: 'Morning Joggers',
      slogan: 'Make yourself a morning person',
      description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      category: 'Pants',
      default_price: '40.00',
      created_at: '2021-08-26T20:30:48.129Z',
      updated_at: '2021-08-26T20:30:48.129Z',
      features: [ [Object], [Object] ]
    }))
  }),
);

const product = {
  id: 47423,
  campus: 'hr-rpp',
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
  category: 'Pants',
  default_price: '40.00',
  created_at: '2021-08-26T20:30:48.129Z',
  updated_at: '2021-08-26T20:30:48.129Z',
  features: [ [Object], [Object] ]
};

const style = {
  "style_id": 286894,
  "name": "Forest Green & Black",
  "original_price": "140.00",
  "sale_price": null,
  "default?": true,
  "photos": [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
      }
  ],
  "skus": {
      "1665053": {
          "quantity": 8,
          "size": "XS"
      },
      "1665054": {
          "quantity": 16,
          "size": "S"
      },
      "1665055": {
          "quantity": 17,
          "size": "M"
      },
      "1665056": {
          "quantity": 10,
          "size": "L"
      },
      "1665057": {
          "quantity": 15,
          "size": "XL"
      },
      "1665058": {
          "quantity": 4,
          "size": "XL"
      }
  }
};

beforeAll (() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tests for Overview Component', () => {
  test('Overview renders to page', () => {
    const app = render(<Overview productUpdate={() => {}} id={47423}/>);
    expect(Object.is(app.queryByTestId('overview-element'), null)).toBe(false);
  });
});


describe('Tests for Product Image component', function () {
  test('Product Image component renders to page', () => {
    const app = render(<ProductImage />);
    expect(Object.is(app.queryByTestId('overview-image'), null)).toBe(false);
  });
});

describe('Tests for Product Details component', function () {
  test('Product Details component renders to page', () => {
    const app = render(<ProductDetails category={'Pants'} name={'Morning Joggers'} price={'40.00'} loaded={true}/>);
    expect(Object.is(app.queryByTestId('overview-details'), null)).toBe(false);
    expect(app.getByText("Morning Joggers")).toBeInTheDocument();
  });
});

describe('Tests for Product Description component', function () {
  test('Product Description component renders to page', () => {
    const app = render(<ProductDescription slogan={product.slogan} description={product.description} features={product.features} loaded={true} />);
    expect(Object.is(app.queryByTestId('overview-description'), null)).toBe(false);
  });
});

describe('Tests for Product Buttons component', function () {

  const app = render(<ProductButtons selected={style} favoriteItem={() => {}} loaded={true}/>);
  test('Product Buttons component renders to page', () => {
    expect(Object.is(app.queryByTestId('overview-buttons'), null)).toBe(false);
  });
  test('Size select element exists', () => {
    expect(Object.is(app.queryByTestId('size-select'), null)).toBe(false);
  });
  test('Quantity select element exists', () => {
    expect(Object.is(app.queryByTestId('quantity-select'), null)).toBe(false);
  });
  test('Add to bag button exists', () => {
    expect(Object.is(app.queryByTestId('bag-btn'), null)).toBe(false);
  });
  test('Add to outfit button exists', () => {
    expect(Object.is(app.queryByTestId('outfit-btn'), null)).toBe(false);
  });
});

describe('Tests for Style Thumbnails component', function () {
  test('Style Thumbnails component renders to page', () => {
    const app = render(<StyleThumbnails photos={style.photos}/>);
    expect(Object.is(app.queryByTestId('overview-stylethumbs'), null)).toBe(false);
  });
});

describe('Tests for Product Styles component', function () {
  test('Product Styles component renders to page', () => {
    const app = render(<ProductStyles name={style.name} styles={[style]} update={() => {}} loaded={true}/>);
    expect(Object.is(app.queryByTestId('overview-styles'), null)).toBe(false);
  });
});
