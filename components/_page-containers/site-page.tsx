import Head from "next/head"
import { PropsWithChildren } from "react";
import AppNav from "../app-header/app-header";
import styles from './page-containers.module.scss';

//-- https://blog.logrocket.com/using-react-children-prop-typescript/
//-- I think it's more correct to extend this type than to specify the type of the children member manuall
//-- The type definition for children is left here for posterity in case I change my mind about the type 
interface SitePageProps extends PropsWithChildren { 
  siteTitle?: string;
  subtitle?: string | null; //-- page head subtitle e.g. {siteTitle} - {subtitle}
  //children?: JSX.Element | JSX.Element[];
}

const SitePage: React.FC<SitePageProps> = ({ 
  siteTitle = 'Claire\'s Kittens', 
  subtitle = null, 
  children 
}) => (
  <>
    <Head>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      <title>{siteTitle}{subtitle && ` - ${subtitle}`}</title>
    </Head>
    <div className={styles['page-container']}>
      <i id="home"></i>
      <AppNav className="app-header" siteTitle={siteTitle}></AppNav>
      <div className="header-spacer">&nbsp;</div>
      <div className="main-view">{children}</div>
      <a className="return-to-top-link" href="#home" title="return to top">⬆</a>
    </div>
  </>
);

export default SitePage;
