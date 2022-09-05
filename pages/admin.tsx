import AdoptionInfoPreview from '@/components/_previews/adoption-info-preview';
import CatOwnershipPreview from '@/components/_previews/cat-ownership-preview';
import CatPreview from '@/components/_previews/cat-preview';
import HomePreview from '@/components/_previews/home-preview';
import { useEffect } from 'react';

export default function AdminPage () {
  /**
    * Render the CMS JS once the render for this component has completed, 
    * allowing it to take over the page once the window object is present.
    * https://livasch.com/2020/09/08/how-to-set-up-netlify-cms-previews-with-next-js 
    */
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      CMS.init();

      CMS.registerPreviewTemplate('home', HomePreview);
      CMS.registerPreviewTemplate('adoption-info', AdoptionInfoPreview);
      CMS.registerPreviewTemplate('cat-ownership', CatOwnershipPreview);
      CMS.registerPreviewTemplate('cat', CatPreview);
    })();
  }, [] /* only once */);

  return <></>;
}
