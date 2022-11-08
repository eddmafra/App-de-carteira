import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteValuesAction } from '../redux/actions';

class Table extends Component {
  deleteValues = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch(deleteValuesAction(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
          && expenses.map((e) => (
            <tr key={ e.id }>
              <td>{e.description }</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{(+e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>{(+e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td>{(e.exchangeRates[e.currency].ask * e.value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="edit-btn">Editar despesa</button>
                <button
                  data-testid="delete-btn"
                  id={ e.id }
                  onClick={ this.deleteValues }
                  type="button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,

});

export default connect(mapStateToProps)(Table);
