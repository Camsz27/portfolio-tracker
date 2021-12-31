import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: function () {},
  logout: function () {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (info) => {
    setUser(info);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const authValue = {
    user,
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
