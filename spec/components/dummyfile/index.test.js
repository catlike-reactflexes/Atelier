/**
 * @jest-environment jsdom
 */
//https://testing-library.com/docs/react-testing-library/example-intro/
 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';
 import { rest } from 'msw'
 import { setupServer } from 'msw/node'
 import App from ' ../../../client/src/index.jsx';

//  [
//   {
//     question_id: 396911,
//     question_body: 'Can I wash it?',
//     question_date: '2018-02-08T00:00:00.000Z',
//     asker_name: 'cleopatra',
//     question_helpfulness: 11,
//     reported: false,
//     answers: { '3715621': [Object], '3715653': [Object], '3715658': [Object] }
//   },
//   {
//     question_id: 396910,
//     question_body: 'How long does it last?',
//     question_date: '2019-07-06T00:00:00.000Z',
//     asker_name: 'funnygirl',
//     question_helpfulness: 8,
//     reported: false,
//     answers: { '3715622': [Object], '3715646': [Object] }
//   }
// ]

 //declare which API requests to mock
 const server = setupServer(
   //capture "GET /api/qa" requests
   rest.get('/api/qa', (req, res, ctx) => {
     //respond using a mocked JSON body
     return res(ctx.json({greeting:'hello there'}))
   }),
 )

//establish API mocking before all tests
 beforeAll(() => server.listen())
 //reset any request handlers that are declared as a part of our tests
 //(i.e. for testing one-time error scenarios)
 afterEach(() => server.resetHandlers())
 //clean up once the tests are done
 afterAll(() => server.close())

//  test('loads and displays greeting', async () => {
//   render(<App url="/api/qa" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toBeDisabled()
// })

//  test('handlers server error', async () => {
//    server.use(
//      rest.get('/api/qa', (req, res, ctx) => {
//        return res(ctx.status(500))
//      }),
//    )
//  })


