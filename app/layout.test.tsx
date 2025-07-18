import React from 'react'; // Required when using JSX in Vitest
import { render, screen } from '@testing-library/react';
import {test, expect} from 'vitest';
import RootLayout from './layout';

test('renders children inside RootLayout', () => {
  render(
    <RootLayout>
      <div>Test content</div>
    </RootLayout>
  );

  expect(screen.getByText('Test content')).toBeInTheDocument();
});
