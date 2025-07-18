import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AdminLayout from './layout'; // Adjust path if needed

describe('<AdminLayout>', () => {
  test('renders navigation links and children correctly', () => {
    render(
      <AdminLayout>
        <p>Test Child</p>
      </AdminLayout>
    );

    // 🧪 Check for main nav links
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Post/i).length).toBeGreaterThanOrEqual(1);

    // 🧪 Check for child content
    expect(screen.getByText(/Test Child/i)).toBeInTheDocument();
  });
});
