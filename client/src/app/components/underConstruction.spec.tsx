import React from 'react';
import { render } from '@testing-library/react';
import { UnderConstruction } from './underConstruction.component';

it('renders without a name', () => {
  const { getByTestId } = render(<UnderConstruction />);
  const element = getByTestId('title');
  expect(element.innerHTML).toBe('');
});

it('renders with a name', () => {
  const testTitle = 'Gabby';

  const { getByTestId } = render(<UnderConstruction title={testTitle} />);
  const element = getByTestId('title');
  expect(element.innerHTML).toBe(testTitle);
});
