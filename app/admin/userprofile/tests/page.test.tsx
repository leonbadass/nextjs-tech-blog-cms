// __tests__/userprofile.test.tsx
import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { screen, render } from '@testing-library/react'

// 🧩 Mock Supabase client before importing the component
vi.mock('@/utils/supabase/server', () => {
  return {
    createClient: vi.fn(() => ({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: '1' } },
          error: null,
        }),
      },
    })),
  };
});

// 🧩 Mock authorService
import * as authorService from '@/services/authorservices';
vi.spyOn(authorService, 'getAuthorById')

// ✅ Import after mocks are set up
import userprofile from '../page'

describe('<userprofile>', () => {
  test('Render user profile', async () => {
    const ui = await userprofile();

    if (ui instanceof Error) {
      throw ui;
    }

    render(ui);

    expect(await screen.findByText('Author')).toBeInTheDocument();
    expect(await screen.findByText('A')).toBeInTheDocument();
    
  });
});
