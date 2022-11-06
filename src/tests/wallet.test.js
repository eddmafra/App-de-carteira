import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Tests <Login /> component', () => {
  test('Verify if page has a field with total amount of expenses', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalValue = screen.queryByTestId('total-field');
    expect(totalValue).toBeValid();
  });

  test('Verify an input for expense', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.queryByTestId('value-field');
    expect(valueInput).toBeDefined();
  });

  test('Verify if page has an input to describe the expense', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.queryByTestId('description-input');
    expect(descriptionInput).toBeValid();
  });

  test('Verify if page has a currency input', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const currencyInput = screen.queryByTestId('currency-input');
    expect(currencyInput).toBeValid();
  });

  test('Verify if page has a method of payment input', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const methodInput = screen.queryByTestId('method-input');
    expect(methodInput).toBeValid();
  });

  test('Verify if page has a type of expnese input', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const tagInput = screen.queryByTestId('tag-input');
    expect(tagInput).toBeValid();
  });

  test('Verify if page has a submit button', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const submitBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(submitBtn).toBeValid();
  });
});
