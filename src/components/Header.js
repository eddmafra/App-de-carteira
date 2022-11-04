import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalValue = expenses.reduce((acc, cur) => {
      const total = acc
       + (Number(cur.value)
       * (Number(cur.exchangeRates[cur.currency].ask)));
      return total;
    }, 0);
    return (
      <div>
        <h4
          data-testid="email-field"
        >
          {email}
        </h4>
        <h4
          data-testid="total-field"
        >
          {totalValue.toFixed(2)}
        </h4>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
