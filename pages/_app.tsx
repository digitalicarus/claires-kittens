import { AppProps } from 'next/app'
import "@/styles/globals.scss";

const AppComponent: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);
export default AppComponent; 
