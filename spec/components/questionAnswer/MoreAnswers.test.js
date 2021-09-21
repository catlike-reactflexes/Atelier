/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import MoreAnswers from ' ../../../client/src/components/questionAnswer/MoreAnswers.jsx';

  const test_allAnswer = [
    {
      "3715653": {
          "id": 3715653,
          "body": "I wouldn't machine wash it",
          "date": "2018-03-08T00:00:00.000Z",
          "answerer_name": "ceasar",
          "helpfulness": 40,
          "photos": []
      }
    }
  ]
 describe('More Answers', function () {
  test('Should render More Answers component', function () {

    const {container} = render(<MoreAnswers allAnswers={test_allAnswer}/>)
    // console.log('Test Add Answer->')

  });


 })