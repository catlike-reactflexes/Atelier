/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';

 import QuesAns from ' ../../../client/src/components/questionAnswer/QuesAns.jsx';


 describe('Add Answer modal popup', function () {
  test('Should render Add Answer component', function () {

    const {container} = render(<QuesAns/>)
    // console.log('Test Add Answer->')

  });


 })