/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RelatedProductsList from ' ../../../client/src/components/relatedProducts/RelatedProductsList.jsx';

describe('Related Products List Component', function () {
  test('Should render a new product card', function () {
    const items = [
      {
        "id": 14,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
      },
      {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69"
      },
      {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40"
      }
    ]

    const imageItems = {
      "product_id": "47423",
      "results": [{
        "default?": true,
        "name": "Black",
        "original_price": "40.00",
        "photos": [{
          "thumbnail_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        }
        ]
      }
      ]
    }


    const app = render(<RelatedProductsList productData={items} imageData={imageItems} />)

    expect(app.getByText("Camo Onesie")).toBeInTheDocument();


  });
});