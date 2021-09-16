/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import AddAnswer from ' ../../../client/src/components/questionAnswer/AddAnswer.jsx';


 describe('Add Answer modal popup', function () {
  test('Should render Add Answer component', function () {

    const {container} = render(<AddAnswer/>)
    // console.log('Test Add Answer->')

  });


 })