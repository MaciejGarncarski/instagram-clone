import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

import { RegisterForm } from '@/components/organisms/registerForm/RegisterForm';

const getElements = () => {
  const submitButton = screen.getByRole('button', { name: /register/ });
  const emailInput = screen.getByText('email');
  const fullNameInput = screen.getByText('full name');
  const userNameInput = screen.getByText('username');
  const passwordInput = screen.getByText('password');

  return { submitButton, emailInput, fullNameInput, userNameInput, passwordInput };
};

describe('RegisterForm', () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <RegisterForm />
        <ToastContainer />
      </QueryClientProvider>
    );
  });

  test('displas errors when no data', async () => {
    const { submitButton } = getElements();
    userEvent.click(submitButton);
    const emailError = await screen.findByText(/Invalid email/);
    const usernameError = await screen.findByText(/Enter valid name and surname/);
    const fullnameError = await screen.findByText('String must contain at least 2 character(s)');
    const passwordError = await screen.findByText(/Password must contain at least 6 characters/);

    expect(emailError).toBeInTheDocument();
    expect(usernameError).toBeInTheDocument();
    expect(fullnameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test('displays matching errors when values are invalid', async () => {
    const { submitButton, emailInput, passwordInput, fullNameInput, userNameInput } = getElements();

    const email = 'piwo@harnas';
    const password = '12345';
    const username = 'DASD..##@!#$';
    const fullName = '13 21 22';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(fullNameInput, fullName);
    userEvent.type(userNameInput, username);
    userEvent.click(submitButton);

    const emailError = await screen.findByText(/Invalid email/);
    const passwordError = await screen.findByText(/Password must contain at least 6 characters/);

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test('succesfully submit with correct data', async () => {
    const { submitButton, emailInput, passwordInput, fullNameInput, userNameInput } = getElements();

    const email = 'test@test.pl';
    const password = '123456';
    const username = 'majorek';
    const fullName = 'Major Suchodolski';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(fullNameInput, fullName);
    userEvent.type(userNameInput, username);
    userEvent.click(submitButton);

    expect(window.location.pathname).toBe('/');
  });
});
