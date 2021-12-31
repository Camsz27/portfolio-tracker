import '../styles/globals.css';
import { AuthContextProvider } from '../store/AuthContext';

global.server = 'http://localhost:27182';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
}

export default MyApp;
