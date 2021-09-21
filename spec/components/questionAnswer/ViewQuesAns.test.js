/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';
 import ViewQuesAns from '../../../client/src/components/questionAnswer/ViewQuesAns.jsx';

  const test_quesAnsId = [
    {
      question_id: 396911,
      question_body: 'Can I wash it?',
      question_date: '2018-02-08T00:00:00.000Z',
      asker_name: 'cleopatra',
      question_helpfulness: 28,
      reported: false,
      answers: {
        3715653:
          {
            answerer_name: "ceasar",
            body: "I wouldn't machine wash it",
            date: "2018-03-08T00:00:00.000Z",
            helpfulness: 40,
            id: 3715653,
            photos: []
        }
      }

    },
    {
      question_id: 396910,
      question_body: 'How long does it last?',
      question_date: '2019-07-06T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 9,
      reported: false,
      answers: {
        3715646:
          {
            answerer_name: "sillyguy",
            body: "Showing no wear after a few months!",
            date: "2019-09-06T00:00:00.000Z",
            helpfulness: 12,
            id: 3715646,
            photos: []
          }
      }
    },
    {
      question_id: 396907,
      question_body: 'What fabric is the top made of?',
      question_date: '2018-01-04T00:00:00.000Z',
      asker_name: 'yankeelover',
      question_helpfulness: 1,
      reported: false,
      answers: {
        3715562:
        {
          answerer_name: "metslover",
          body: "Something pretty soft but I can't be sure",
          date: "2018-01-04T00:00:00.000Z",
          helpfulness: 6,
          id: 3715562,
          photos:[
            "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
            "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
            "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
          ]
        }
      }
    }
  ]

describe('View Question', function () {
  test('Should render View Question component', function () {

    const {container} = render(<ViewQuesAns quesAnsId={test_quesAnsId} open='true'/>)
    const inputNode1 = container.querySelector('#nickname')

  });

 })