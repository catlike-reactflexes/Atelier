/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import SearchQa from ' ../../../client/src/components/questionAnswer/SearchQa.jsx';


 describe('Search for related Question', function () {

  test('Should render Search Question component', function () {
    const {getByTestId} = render(<SearchQa/>);

    const searchQuestion = getByTestId("searchQues");

    expect(searchQuestion).toBeInTheDocument();

  });


 })