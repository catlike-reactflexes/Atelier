/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';
 import { rest } from 'msw'
 import { setupServer } from 'msw/node'
 import QuesAnsMain from ' ../../../client/src/components/questionAnswer/1QuesAnsMain.jsx';


 //these test the components and how they are rendering
 describe('Question And Answer', function () {
   test('Should render related products parent component', function () {
     render(<QuesAnsMain />)



   });
 });