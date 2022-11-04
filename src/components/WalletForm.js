import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    // console.log(this.props);
    return (
      <form>
        <label htmlFor="expense">
          Despesa:
          <input
            data-testid="value-input"
            type="text"
            name="expense"
            id="expense"
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
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          onChange={ this.handleChange }
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
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
