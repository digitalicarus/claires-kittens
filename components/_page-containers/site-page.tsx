import Head from "next/head"
import { createRef, PropsWithChildren } from "react";
import { scrollToTop } from "@/root/shared-utilities-and-types";
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
}) => {
  const containerRef = createRef<HTMLDivElement>();
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <title>{siteTitle}{subtitle && ` - ${subtitle}`}</title>
      </Head>
      <div className={styles['page-container']} ref={containerRef}>
        <i id="home"></i>
        <AppNav 
          className="app-header" 
          siteTitle={siteTitle} 
          siteTitleClick={() => {scrollToTop(containerRef!.current)}}
        ></AppNav>
        <div className="header-spacer">&nbsp;</div>
        <div className="main-view">{children}</div>
      </div>
    </>
  );
};

export default SitePage;
