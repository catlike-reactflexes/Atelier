/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen ,getByText,getByLabelText,getByPlaceholderText} from '@testing-library/react';
 import AddQuestion from ' ../../../client/src/components/questionAnswer/AddQuestion.jsx';


//modal (popup) form to add a question
 describe('Add A Question', function () {
  test('Should render Add Question component', function () {
    // render(<AddQuestion open='true'/>)
    // const inputNode1 = screen.getByLabelText('nickname/i')

    const {container} = render(<AddQuestion open='true'/>)
    const inputNode1 = container.querySelector('#nickname')
    // console.log('Test-->',inputNode1)
    // expect(screen.getByLabelText('/question/i')).toBeInTheDocument();
  });


 })