/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen,fireEvent } from '@testing-library/react';
 import AddQuestion from ' ../../../client/src/components/questionAnswer/AddQuestion.jsx';


//modal (popup) form to add a question
 describe('Add A Question', function () {
  test('Should render Add Question component', function () {

    render(<AddQuestion open='true'/>)
    // screen.debug()

  });
  /*******
   *
   * The component is not showing up because it is part of the different div
   * need to research how to show the dvi with debug()
   *
   *********
  test('Add a question renders', () => {
    const handleSubmit = jest.fn()
    const {getByText, container} = render(
      <AddQuestion onClick={handleSubmit} />,
    )
    const test_question = getByText('Question')

    const fakeUser = {question: '"Is it wool?"', nickname: 'wonderland'}

    question.value = fakeUser.username
    nickname.value = fakeUser.password

    Simulate.submit(container.querySelector('form'))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith(fakeUser)

  })

  test('modal shows component', function () {
    const test_question = question;
    const test_nickname = 'rosey';
    const test_email = "rosey@gmail.com";

    let { getByText, getByTestId} = render(<AddQuestion open='true'/> );

    fireEvent.change(getByTestId("question"),{
      target:{value: test_question}
    });
    expect(getByTestId("question").value).toEqual(question);
  });

*/
 })