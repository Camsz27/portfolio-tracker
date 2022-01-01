import '../styles/globals.css';
import { AuthContextProvider } from '../store/AuthContext';

global.server = 'https://gentle-tundra-81871.herokuapp.com';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
