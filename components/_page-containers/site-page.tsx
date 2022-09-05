import Head from "next/head"
import { PropsWithChildren } from "react";
import AppNav from "../app-nav/app-nav";
import styles from './page.module.scss';

//-- https://blog.logrocket.com/using-react-children-prop-typescript/
//-- I think it's more correct to extend this type than to specify the type of the children member manuall
//-- The type definition for children is left here for posterity in case I change my mind about the type 
interface SitePageProps extends PropsWithChildren { 
  subtitle?: string | null; //-- page head subtitle e.g. Claire's Kittens - {subtitle}
  //children?: JSX.Element | JSX.Element[];
}

const SitePage: React.FC<SitePageProps> = ({ subtitle = null, children }) => (
  <>
    <Head>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      <title>Claire's Kittens{subtitle && ` - ${subtitle}`}</title>
    </Head>
    <div className={styles['page-container']}>
      <AppNav className={styles['app-header']}></AppNav>
      <div className={styles['main-view']}>{children}</div>
    </div>
  </>
);

export default SitePage;
