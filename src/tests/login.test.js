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
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(/email-input/i);
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, 'trybe@test.com');

    const passwordInput = screen.getByTestId(/password-input/i);
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(passwordInput, '123Abc');

    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    expect(entrarBtn).toBeInTheDocument();
    userEvent.click(entrarBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    const emailHeader = screen.getByText(emailInput);
    expect(emailHeader).toBeInTheDocument();
  });
  test('Verify if login button is disabled after typing invalid email and passwords', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    userEvent.type(emailInput, 'thisIsNotEmail');
    expect(emailInput.value).toBe('thisIsNotEmail');
    const passwordInput = screen.getByTestId(/password-input/i);
    userEvent.type(passwordInput, '123ab');
    expect(passwordInput.value).toBe('123ab');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarBtn).toBeDisabled();
  });
  test('Verify if login button is enabled after typing valid email and passwords', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    userEvent.type(emailInput, 'trybe@teste.com');
    expect(emailInput.value).toBe('trybe@teste.com');
    const passwordInput = screen.getByTestId(/password-input/i);
    userEvent.type(passwordInput, '123abc');
    expect(emailInput.value).toBe('123abc');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarBtn).toBeEnabled();
  });
});
