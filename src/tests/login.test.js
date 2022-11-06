import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Tests <Login /> component', () => {
  test('Verify e-mail input', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(/email-input/i);
    expect(emailInput).toBeValid();
  });

  test('Verify password input', () => {
    renderWithRouterAndRedux(<App />);

    const passwordInput = screen.getByTestId(/password-input/i);
    expect(passwordInput).toBeValid();
  });

  test('Verify "entrar" button', () => {
    renderWithRouterAndRedux(<App />);

    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    expect(entrarBtn).toBeDefined();
  });

  test('Verify redirection to "/carteira" by clicking button', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(/email-input/i);
    userEvent.type(emailInput, 'trybe@test.com');

    const passwordInput = screen.getByTestId(/password-input/i);
    userEvent.type(passwordInput, '123Abc');

    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(entrarBtn);
  });
});
