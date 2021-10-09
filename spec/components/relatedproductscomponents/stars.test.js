/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Stars from ' ../../../client/src/components/relatedProducts/Stars.jsx';


const ratings =
{
  "product": "47421",
  "page": 0,
  "count": 100,
  "results": [
    {
      "review_id": 841849,
      "rating": 5,
      "summary": "This product will change your life",
      "recommend": true,
      "response": null,
      "body": "this product was so good it changed my life. now my life is changed",
      "date": "2021-10-09T00:00:00.000Z",
      "reviewer_name": "Truthiness",
      "helpfulness": 0,
      "photos": []
    }
  ]
}

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Stars component', function () {
  test('should render stars', function (done) {
    server.use(
      rest.get('/reviewratings', (req, res, ctx) => {
        return res(ctx.json(ratings))
      })
    )
    const app = render(<Stars id={47421} />);
    app.findAllByTestId('star')
      .then((elements) => {
        expect(elements.length).toBe(5);
        done();
      })
      .catch((error) => {
        console.log('AN ERROR BREH: ', error);
        done();
      })
  })
  test('should not render stars', function () {
    server.use(
      rest.get('/reviewratings', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const app = render(<Stars id={47421} />);
    app.findAllByTestId('star')
      .then((elements) => {
        expect(elements.length).toBe(5);
        done();
      })
      .catch((error) => {
        console.log('AN ERROR BREH: ', error);
        done();
      })
  })
})