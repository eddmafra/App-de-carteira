import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  render() {
    const { total } = this.state;
    const { email } = this.props;
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
          {total}
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});
export default connect(mapStateToProps)(Header);
