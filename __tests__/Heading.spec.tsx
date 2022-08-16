import { render, screen } from '@testing-library/react';

import { Heading } from '../components/Heading';

describe('test-test', () => {
  test('Should render "hej" Text', () => {
    render(<Heading />);
    expect(screen.getByText('hej')).toBeInTheDocument();
  });
});
