import React from 'react';
import { render } from '@testing-library/react';
import { NotFoundComponent } from './notFound.component';
import { MemoryRouter } from 'react-router-dom';

test('renders', () => {
  render(
    <>
      <MemoryRouter>
        <NotFoundComponent />
      </MemoryRouter>
    </>
  );
});
