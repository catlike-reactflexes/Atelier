/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import ReviewList from ' ../../../client/src/components/reviews/ReviewList.jsx';

 describe('Review List Component', function () {
   test('Should render new reviews', function () {
     const reviews = [
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
      },
      {
          "review_id": 820852,
          "rating": 5,
          "summary": "dfvdfv",
          "recommend": false,
          "response": null,
          "body": "dfvdfvkfnkjdfngkjdfngkjdfngkjdfngkjdfngkdfngkjdnfkgjndfg",
          "date": "2021-09-10T00:00:00.000Z",
          "reviewer_name": "fddfg",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 820850,
          "rating": 4,
          "summary": "sdfsdfgdf",
          "recommend": false,
          "response": null,
          "body": "gdfgkjdfnkjdbfngkjdfbnkjgbdnfkjgnjdfngjkndfjkgndfjkgngkjnkjn",
          "date": "2021-09-09T00:00:00.000Z",
          "reviewer_name": "sdfsdfs",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 800940,
          "rating": 1,
          "summary": "sdf",
          "recommend": false,
          "response": null,
          "body": "asdfasdfijkals;kdjf;lakjsdl;fkajs;ldkjfaasldkfjl;aksdjl;f",
          "date": "2021-08-28T00:00:00.000Z",
          "reviewer_name": "asdfa",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 800939,
          "rating": 1,
          "summary": "sdf",
          "recommend": false,
          "response": null,
          "body": "asdfasdfijkals;kdjf;lakjsdl;fkajs;ldkjfaasldkfjl;aksdjl;f",
          "date": "2021-08-28T00:00:00.000Z",
          "reviewer_name": "asdfa",
          "helpfulness": 0,
          "photos": []
      }
  ]





     const app = render(<ReviewList reviews = {reviews}  />)

     expect(app.getByText("This product was ok!")).toBeInTheDocument();


   });
 });