import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

import { LoginForm } from '@/components/organisms/loginForm/LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
        <ToastContainer />
      </QueryClientProvider>
    );
  });
  it('displas errors when no data', async () => {
    const submitButton = screen.getByRole('button', { name: /Log in/ });
    userEvent.click(submitButton);
    const emailError = await screen.findByText(/Invalid email/);
    const passwordError = await screen.findByText(/Password must contain at least 6 characters/);

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
  it('displays matching errors when values are invalid', async () => {
    const submitButton = screen.getByRole('button', { name: /Log in/ });
    const emailInput = screen.getByText('email');
    const passwordInput = screen.getByText('password');

    const email = 'piwo@harnas';
    const password = '12345';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    const emailError = await screen.findByText(/Invalid email/);
    const passwordError = await screen.findByText(/Password must contain at least 6 characters/);

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
  it('succesfully submit with correct data', async () => {
    const emailInput = screen.getByText('email');
    const passwordInput = screen.getByText('password');
    const submitButton = screen.getByRole('button', { name: /Log in/ });

    const email = 'test@test.pl';
    const password = '123456';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    expect(window.location.pathname).toBe('/');
  });
});
