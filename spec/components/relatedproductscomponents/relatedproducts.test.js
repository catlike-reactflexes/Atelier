/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import RelatedProducts from ' ../../../client/src/components/relatedProducts/RelatedProducts.jsx';

// this sets up the fake server at the route that you are testing
// const server = setupServer(
//   rest.get('/relatedProductsEventually', (req, res, ctx) => {
//     //returns json like you would get from an api request
//     return res(ctx.json(someObjectLikeWhatComesBackFromAPI))
//   }),
// )
// //these are for jest, they are required
// //first one starts server
// //second one cleans slate (probably don't need this right now)
// //third one closes server to make sure it isn't still running
// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

//these test the components and how they are rendering
describe('Related Products Component', function () {
  test('Should render related products parent component', function () {
    const app = render(<RelatedProducts />)


  });
});