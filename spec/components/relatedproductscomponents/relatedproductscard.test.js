/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RelatedProductsCard from ' ../../../client/src/components/relatedProducts/RelatedProductsCard.jsx';

describe('Related Products Card Component', function () {
  test('Should render a new product card', function () {
    const item = {
      "campus": "hr-rpp",
      "category": "Pants",
      "created_at": "2021-08-26T20:30:48.129Z",
      "default_price": "40.00",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "id": 47423,
      "image": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "updated_at": "2021-08-26T20:30:48.129Z"

    }

    const app = render(<RelatedProductsCard key={0} name={item.name} price={item.default_price} category={item.category} description={item.description}
      image={item.image} />)

    expect(app.getByText("Morning Joggers")).toBeInTheDocument();
  });
});