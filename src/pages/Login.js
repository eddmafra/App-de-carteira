import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLoginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateBtn());
  };

  validateBtn = () => {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validadeEmail = regexEmail.test(email);
    const validadePassword = password.length >= passwordMinLength;
    const validate = validadeEmail && validadePassword;
    if (validate) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  submitUser = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userLoginAction(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          id="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.submitUser }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
