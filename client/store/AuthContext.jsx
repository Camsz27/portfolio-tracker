import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: function () {},
  logout: function () {},
  initial: function () {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(user);
    }
    const session = localStorage.getItem('login');
    if (session) {
      setIsLoggedIn(session);
    }
  }, []);

  const login = (info) => {
    setUser(info);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const initial = (userInfo, logInfo) => {
    setUser(userInfo);
    setIsLoggedIn(logInfo);
  };

  const authValue = {
    user,
    isLoggedIn,
    login,
    logout,
    initial,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
