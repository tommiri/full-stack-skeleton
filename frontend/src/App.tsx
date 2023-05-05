import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AuthContext from './shared/context/auth-context';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState<Date>();

  const login = useCallback(
    (userId: string, userToken: string, expirationDate: Date) => {
      setToken(userToken);
      setUser(userId);

      const expiration =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpiration(expiration);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          token: userToken,
          expiration,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken('');
    setUser('');
    setTokenExpiration(undefined);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData') || '');
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.usedId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const logoutTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimerRef.current = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimerRef.current);
    }
  }, [token, logout, tokenExpiration]);

  let routes: React.ReactElement;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isLoggedIn: !!token,
        token,
        userId: user,
        login,
        logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
