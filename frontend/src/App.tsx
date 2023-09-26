import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NotFound from './pages/NotFound';
import Authenticate from './users/pages/Authenticate';
import AuthContext from './shared/context/auth-context';
import MainNavigation from './shared/navigation/MainNavigation';
import Examples from './examples/pages/Examples';

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState<Date>();

  const login = useCallback(
    (userId: string, userToken: string, expirationDate: Date | undefined) => {
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
          expiration: expiration.toISOString(),
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
    const storedData = JSON.parse(localStorage.getItem('userData'));
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

  let routes: JSX.Element;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Examples />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Examples />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth" element={<Authenticate />} />
      </Routes>
    );
  }

  const authContextProviderValue = useMemo(
    () => ({
      isLoggedIn: !!token,
      token,
      userId: user,
      login,
      logout,
    }),
    [login, logout, user, token]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
