/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ComparisonModalItem from ' ../../../client/src/components/relatedProducts/ComparisonModalItem.jsx';

describe('Comparison Modal Item', function () {
  test('Should render a modal comparing clicked product to overview', function () {
    const feature = "Cut";
    const value = "Canvas";
    const productFeatures = [{
      feature: "Fabric",
      value: "100% Cotton"
    },
    {
      feature: "Cut",
      value: "Skinny"
    }];

    const overviewProductFeatures = [{
      feature: "Fabric",
      value: "Canvas"
    },
    {
      feature: "Buttons",
      value: "Brass"
    }]


    const app = render(<table><tbody><ComparisonModalItem feature={feature} value={value}
      productFeatures={productFeatures}
      overviewProductFeatures={overviewProductFeatures} /></tbody></table>)

    expect(app.getByText("Cut : Canvas")).toBeInTheDocument();
  });
});