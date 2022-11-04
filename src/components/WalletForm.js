import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, submitValuesAction } from '../redux/actions';
import coinsAPI from '../services/coinsAPI';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  idNumber = () => {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      this.setState((prev) => ({
        id: prev.id + 1,
      }));
    }
  };

  saveRate = async () => {
    const coins = await coinsAPI();
    delete coins.USDT;
    this.setState({ exchangeRates: coins }, () => {
      const { dispatch } = this.props;
      dispatch(submitValuesAction(this.state));
      this.setState({ value: '', description: '' });
    });
  };

  submitBtn = async () => {
    this.idNumber();
    await this.saveRate();
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    // console.log(this.props);
    return (
      <form>
        <label htmlFor="value">
          Despesa:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            value={ value }
            placeholder="Valor da Despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição da Despesa:
          <textarea
            data-testid="description-input"
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          {
            currencies.filter((e) => e !== 'USDT')
              .map((e, i) => (
                <option key={ i }>
                  { e }
                </option>
              ))
          }
        </select>
        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="button"
          onClick={ this.submitBtn }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
