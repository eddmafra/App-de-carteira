import coinsAPI from '../../services/coinsAPI';

export const USER_LOGIN = 'USER_LOGIN';

export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  email: payload,
});

export default USER_LOGIN;

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RESPONSE_CURRENCIES_SUCCESS = 'RESPONSE_CURRENCIES_SUCCESS';
export const RESPONSE_CURRENCIES_ERROR = 'RESPONSE_CURRENCIES_ERROR';

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const responseSuccess = (payload) => ({
  type: RESPONSE_CURRENCIES_SUCCESS,
  payload,
});

export const responseError = (error) => ({
  type: RESPONSE_CURRENCIES_ERROR,
  error,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies);
    try {
      const API = await coinsAPI();
      delete API.USDT;
      dispatch(responseSuccess(Object.keys(API)));
    } catch (error) {
      dispatch(responseError(error));
    }
  };
}

export const SUBMIT_VALUES = 'SUBMIT_VALUES';
export const submitValuesAction = (payload) => ({
  type: SUBMIT_VALUES,
  payload,
});
