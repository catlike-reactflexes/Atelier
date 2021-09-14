/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RelatedProductsCard from ' ../../../client/src/components/relatedProducts/components/RelatedProductsCard.jsx';

describe('Related Products Card Component', function () {
  test('Should render a new product card', function () {
    const item = {
      "id": 2,
      "name": "Morning Joggers",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69"
    }

    const app = render(<RelatedProductsCard name={item.name} category={item.category} price={item.default_price} index={0} />)

    expect(app.getByText("Morning Joggers")).toBeInTheDocument();
  });
});