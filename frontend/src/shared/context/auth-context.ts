import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string;
  userId: string;
  login: (userId: string, userToken: string, expirationDate?: Date) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: '',
  userId: '',
  login: () => {},
  logout: () => {},
});

export default AuthContext;
