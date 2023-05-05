import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  userId: '',
  login: () => {},
  logout: () => {},
});

export default AuthContext;
