/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import YourOutfitCard from ' ../../../client/src/components/relatedProducts/yourOutfitCard.jsx';

describe('Your Outfit Card Component', function () {
  test('Should render a new outfit card', function () {
    const item = {
      "campus": "hr-rpp",
      "category": "Pants",
      "created_at": "2021-08-26T20:30:48.129Z",
      "default_price": "40.00",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "id": 47423,
      "image": { results: [{ photos: [{ thumbnail_url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" }] }] },
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "updated_at": "2021-08-26T20:30:48.129Z"

    }




    // key={index} name={item.name} image={item.image} price={item.default_price}
    //       category={item.category} id={item.id} updateOutfitData={this.props.updateOutfitData}

    const app = render(<YourOutfitCard key={0} name={item.name} price={item.default_price} category={item.category} description={item.description}
      image={item.image}
      id={item.id} />)

    expect(app.getByText("Morning Joggers")).toBeInTheDocument();
  });
});