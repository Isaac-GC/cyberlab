import { AuthProvider } from "../components/auth"
import "../styles/styles.css"


function App({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;