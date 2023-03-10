import { REQUEST_CURRENCIES,
  RESPONSE_CURRENCIES_SUCCESS,
  RESPONSE_CURRENCIES_ERROR,
  SUBMIT_VALUES, DELETE_VALUES } from '../actions';

export const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: null,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case RESPONSE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case RESPONSE_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SUBMIT_VALUES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_VALUES:
    return {
      ...state,
      expenses: [...state.expenses.filter((e) => e.id !== +action.id)],
    };
  default:
    return state;
  }
}

export default walletReducer;
