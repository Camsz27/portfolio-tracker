import '../styles/globals.css';
import { AuthContextProvider } from '../store/AuthContext';
import { useContext, useEffect } from 'react';
import AuthContext from '../store/AuthContext';

global.server = 'http://localhost:27182';

function MyApp({ Component, pageProps }) {
  // const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   const login = localStorage.getItem('login');
  //   console.log(user);
  //   console.log(login);
  //   authContext.initial(user, login);
  // }, [authContext]);

  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
}

export default MyApp;
