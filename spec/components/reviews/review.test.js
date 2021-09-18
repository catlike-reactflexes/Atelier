/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import Review from ' ../../../client/src/components/reviews/Review.jsx';

 describe('Review Component', function () {
   test('Should render a new review', function () {
     const review = [
      {
          "review_id": 781037,
          "rating": 4,
          "summary": "This product was ok!",
          "recommend": false,
          "response": "",
          "body": "I really did not like this product solely because I am tiny and do not fit into it.",
          "date": "2019-01-11T00:00:00.000Z",
          "reviewer_name": "mymainstreammother",
          "helpfulness": 14,
          "photos": []
      }
  ]





     const app = render(<Review key = {0} review = {review}  />)

     expect(app.getByText("This product was ok!")).toBeInTheDocument();


   });
 });