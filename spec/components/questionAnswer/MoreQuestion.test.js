/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import MoreQuestion from ' ../../../client/src/components/questionAnswer/MoreQuestion.jsx';


 describe('Add Answer modal popup', function () {
  test('Should render Add Answer component', function () {

    const {container} = render(<MoreQuestion/>)
    // console.log('Test Add Answer->')

  });


 })