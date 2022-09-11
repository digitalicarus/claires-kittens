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
      const adminDocument = document.querySelector('html');
      const buildStatus = document.createElement('div');

      buildStatus.id = 'netlify-build-status';
      buildStatus.style.visibility = 'hidden';

      CMS.init();

      CMS.registerPreviewTemplate('home', HomePreview);
      CMS.registerPreviewTemplate('adoption-info', AdoptionInfoPreview);
      CMS.registerPreviewTemplate('cat-ownership', CatOwnershipPreview);
      CMS.registerPreviewTemplate('cat', CatPreview);

      adminDocument?.setAttribute('cms-admin', '');
      adminDocument?.appendChild(buildStatus);

      function refreshBuildStatus () {
        buildStatus.innerHTML = `
          <img src="https://api.netlify.com/api/v1/badges/39274c69-39fe-45ca-ab65-ea7ed7ccb755/deploy-status?${Math.random()}" alt="Netlify Status">
        `;
      }

      //setInterval(refreshBuildStatus, 5000);
      refreshBuildStatus();
    })();
  }, [] /* only once */);

  return <></>;
}
