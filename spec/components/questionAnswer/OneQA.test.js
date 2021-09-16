/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import OneQA from ' ../../../client/src/components/questionAnswer/OneQA.jsx';

 describe('One Question & Answer', function () {
  test('Should render Question & Answer component', function () {
    const dummyTest =  {
      question_id: 396911,
      question_body: 'Can I wash it?',
      question_date: '2018-02-08T00:00:00.000Z',
      asker_name: 'cleopatra',
      question_helpfulness: 11,
      reported: false,
      answers: {  '3715621':
                    {
                      answerer_name: "ceasar",
                      body: "It says not to",
                      date: "2018-03-08T00:00:00.000Z",
                      helpfulness: 2,
                      id: 3715621
                    },
                  '3715653':
                  {
                    answerer_name: "ceasar",
                    body: "I wouldn't machine wash it",
                    date: "2018-03-08T00:00:00.000Z",
                    helpfulness: 0,
                    id: 3715653
                  },
                  '3715658':
                  {
                    answerer_name: "ceasar",
                    body: "Only if you want to ruin it!",
                    date: "2018-03-08T00:00:00.000Z",
                    helpfulness: 6,
                    id: 3715658
                  }
                }
    }
    const {container} = render(<OneQA one={dummyTest}/>)
    // console.log('Test one QA->', container)

  });


 })