/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import OneAnswer from ' ../../../client/src/components/questionAnswer/OneAnswer.jsx';

 const test_oneAnswer = {
  "id": 3715562,
  "body": "Something pretty soft but I can't be sure",
  "date": "2018-01-04T00:00:00.000Z",
  "answerer_name": "metslover",
  "helpfulness": 6,
  "photos": [
      "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
      "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
  ]
  }

 describe('Display One Answer ', function () {
  test('Should render One Answer component', function () {

    const {container} = render(<OneAnswer oneAnswer={test_oneAnswer}/>)
    // console.log('Test Add Answer->')

  });


 })