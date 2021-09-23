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
    const app = render(<ProductDescription />);
    expect(Object.is(app.queryByTestId('overview-description'), null)).toBe(false);
  });
});

describe('Tests for Product Buttons component', function () {
  test('Product Buttons component renders to page', () => {
    const app = render(<ProductButtons />);
    expect(Object.is(app.queryByTestId('overview-buttons'), null)).toBe(false);
  });
});

describe('Tests for Style Thumbnails component', function () {
  test('Style Thumbnails component renders to page', () => {
    const app = render(<StyleThumbnails />);
    expect(Object.is(app.queryByTestId('overview-stylethumbs'), null)).toBe(false);
  });
});

describe('Tests for Product Styles component', function () {
  test('Product Styles component renders to page', () => {
    const app = render(<ProductStyles />);
    expect(Object.is(app.queryByTestId('overview-styles'), null)).toBe(false);
  });
});
