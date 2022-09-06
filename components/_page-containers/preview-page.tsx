import { PropsWithChildren, useEffect } from "react";
import styles from './page-containers.module.scss';

interface PreviewPageProps extends PropsWithChildren { 
  document: Document
}

const PreviewPage: React.FC<PreviewPageProps> = ({ children, document }) => {

  function appendStyleTextToFrameHead (cssText: string) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    head.appendChild(style);

    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(cssText));
  }

  useEffect(() => {
    //-- relocate css module <style> tags into the iframe created by Netlify CMS preview
    const parentDoc = window.document;
    const previewHtmlElement = document.querySelector('html');

    const styleTexts = Array.prototype.slice.call(parentDoc.querySelectorAll('style'))
      .filter(styleTag => styleTag.attributes.length === 0) // css-loader style tags don't have any attributes
      .map(styleTag => styleTag.innerText);

    styleTexts.forEach(cssText => appendStyleTextToFrameHead(cssText));
    previewHtmlElement!.setAttribute('preview-container', '');
  }, []);

  return (
    <>
      <div className={styles['page-container']}>
        { children }     
      </div>
    </>
  );
}

export default PreviewPage;
