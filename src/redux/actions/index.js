export const USER_LOGIN = 'USER_LOGIN';

export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  email: payload,
});

export default USER_LOGIN;
