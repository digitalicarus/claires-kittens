import { PropsWithChildren, useEffect } from "react";
import styles from './page-containers.module.scss';

interface PreviewPageProps extends PropsWithChildren { 
  document: Document
}

const PreviewPage: React.FC<PreviewPageProps> = ({ children, document }) => {
  const parentDoc = window.document;
  const previewFrameDoc = document;
  const previewFrameHead = previewFrameDoc.head || previewFrameDoc.getElementsByTagName("head")[0];

  function appendStyleTextToFrameHead(cssText: string) {
    const style = previewFrameDoc.createElement("style");
    previewFrameHead.appendChild(style);

    style.setAttribute("type", "text/css");
    style.appendChild(previewFrameDoc.createTextNode(cssText));
  }

  useEffect(() => {
    //-- relocate css module <style> tags into the iframe created by Netlify CMS preview
    const previewHtmlElement = previewFrameDoc.querySelector("html");

    /**
     * NEXT DEV MODE
     * The React components will drop style tags into the parent document head
     * netlify uses emotion - don't copy the style tags created by emotion
     */
    const styleTexts = Array.prototype.slice // convert nodelist to array
      .call(parentDoc.querySelectorAll("style:not([data-emotion])"))
      .map((styleTag) => styleTag.innerText);

    styleTexts.forEach((cssText) => appendStyleTextToFrameHead(cssText));
    previewHtmlElement!.setAttribute("preview-container", "");

    /**
      * NEXT PROD BUILD
      * In prod mode next produces CSS file bundles with cache busting style file names,
      * but they seem to use the '_next/static/css' directory predictably.
      *
      * Try to carefully pick those link tags out to duplicate into the preview frame.
      */
    const frameLinkTagCopies = Array.prototype.slice
      .call(parentDoc.querySelectorAll("link[href*='_next'][rel='stylesheet']"))
      .map((parentLinkEle: HTMLLinkElement) => {
        /**
          * I thought about using node.cloneNode() here,
          * but I'm not sure that's great if we are relocating a clone from one document to another.
          * ~Adam
          */
         const linkEleCopy = previewFrameDoc.createElement('link');
         previewFrameHead.appendChild(linkEleCopy);

         linkEleCopy.setAttribute('rel', parentLinkEle.getAttribute('rel')||'');
         linkEleCopy.setAttribute('href', parentLinkEle.getAttribute('href')||'');
      });
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
