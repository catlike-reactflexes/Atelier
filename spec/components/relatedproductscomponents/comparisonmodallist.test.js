/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ComparisonModalList from ' ../../../client/src/components/relatedProducts/ComparisonModalList.jsx';

describe('Comparison Modal List Component', function () {
  test('Should map data to comparison modal item', function () {
    const features = [{
      feature: "Fabric",
      value: "100% Cotton"
    },
    {
      feature: "Cut",
      value: "Skinny"
    }];

    const name = "Camo Onesie";

    const overviewProductFeatures = {
      campus: "hr-rpp",
      category: "Jackets",
      created_at: "2021-08-26T20:30:48.129Z",
      default_price: "140.00",
      description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      features: [{
        feature: "Fabric",
        value: "Canvas"
      },
      {
        feature: "Buttons"
      }]
    }





    const app = render(<ComparisonModalList productFeatures={features} name={name} overviewProduct={overviewProductFeatures} />)

    expect(app.getByText("Camo Onesie")).toBeInTheDocument();


  });
});