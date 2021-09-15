/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';
 import ViewQuestion from '../../../client/src/components/questionAnswer/ViewQuestion.jsx';



describe('View Question', function () {
  test('Should render View Question component', function () {

    const {container} = render(<ViewQuestion open='true'/>)
    const inputNode1 = container.querySelector('#nickname')

  });

 })