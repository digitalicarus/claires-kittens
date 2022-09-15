import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import Cat from "../_main-views/cat";
import { IGallerySource } from "../gallery/gallery";
import PreviewPage from "../_page-containers/preview-page";

interface CatPreviewProps extends PreviewTemplateComponentProps {}

const CatPreview: React.FC<CatPreviewProps> = ({ entry, document }) => {
  const name = entry.getIn(['data', 'name']);
  const featuredPicture = entry.getIn(['data', 'featured_picture']);
  const about = entry.getIn(['data', 'body']);

  /** 
    * While you are editing and add a gallery item it's blank. 
    * This guards agains a blank entry causing an error in the component 
    */
  const gallerySources = entry
    .getIn(['data', 'gallery'])
    .toJS()
    .filter((gallerySource: IGallerySource) => !!gallerySource.src); // only ones with a url

  return (
    <>
      <PreviewPage document={document}>
        <Cat
          name={name}
          featuredPicture={featuredPicture}
          about={about}
          gallerySources={gallerySources}
        ></Cat>
      </PreviewPage>
    </>
  );
};

export default CatPreview;