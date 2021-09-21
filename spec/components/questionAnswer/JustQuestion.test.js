/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import JustQuestion from ' ../../../client/src/components/questionAnswer/JustQuestion.jsx';

  const test_justOneQues = {
    "question_id": 396911,
    "question_body": "Can I wash it?",
    "question_date": "2018-02-08T00:00:00.000Z",
    "asker_name": "cleopatra",
    "question_helpfulness": 28,
    "reported": false,
    "answers": {
        "3715653": {
            "id": 3715653,
            "body": "I wouldn't machine wash it",
            "date": "2018-03-08T00:00:00.000Z",
            "answerer_name": "ceasar",
            "helpfulness": 40,
            "photos": []
        }
    }
}
 describe('One Question Component', function () {
  test('Should render just question component', function () {

    const {container} = render(<JustQuestion justOneQues={test_justOneQues}/>)
    // console.log('Test Add Answer->')

  });


 })