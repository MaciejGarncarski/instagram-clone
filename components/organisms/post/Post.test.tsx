import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { Post } from '@/components/organisms/post/Post';

describe('Post', () => {
  const queryClient = new QueryClient();
  test('Should render properly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Post id={61} />
      </QueryClientProvider>
    );
    const description = await screen.findByText(/Wassup/i);

    expect(description).not.toBeInTheDocument();
  });
});
