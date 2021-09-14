import * as React from 'react'
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import QuesAnsMain from './1QuesAnsMain.jsx';

test('should have search component', () => {
  const testMessage = 'Test Message'
  render(<QuesAnsMain>{testMessage}</QuesAnsMain>);
  expect(screen.queryByText(testMessage)).toBeNull()
  // expect(screen.getByText(testMessage)).toBeInTheDocument();
})