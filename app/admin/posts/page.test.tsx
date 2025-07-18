// app/admin/posts/page.test.tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import Posts from './page';
import {describe, test, expect} from 'vitest'

describe('<Posts/>', () => {
  test('renders table with post data', async () => {
    
     
    // 🧪 Render the server component
    const ui = await Posts(); //   server component
    render(ui);

    //  Wait for and assert  post is rendered
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    

    expect(screen.getByText('POST TITLE')).toBeInTheDocument();
    expect(screen.getByText('Post2 Title')).toBeInTheDocument();

    });
  });
});