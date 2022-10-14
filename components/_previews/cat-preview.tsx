import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import Cat from "../_main-views/cat/cat";
import PreviewPage from "../_page-containers/preview-page";
import { IGallerySource } from "@/root/shared-utilities-and-types";
import { CatRecord } from "../_main-views/cat/cat.types";

interface CatPreviewProps extends PreviewTemplateComponentProps {}

const CatPreview: React.FC<CatPreviewProps> = ({ entry, document }) => {
  const name = entry.getIn(['data', 'name']);
  const gender = entry.getIn(['data', 'gender']);
  const adopted = entry.getIn(['data', 'adopted']);
  const about = entry.getIn(['data', 'about']);
  const picture = entry.getIn(['data', 'picture']);

  /** 
    * While you are editing and add a gallery item it's blank. 
    * This guards agains a blank entry causing an error in the component 
    */
  const galleryImmutable = entry
    .getIn(['data', 'gallery']);
  const gallery = galleryImmutable ? 
    galleryImmutable
      .toJS()
      .filter((gallerySource: IGallerySource) => !!gallerySource.src) // only ones with a url
    : [];

  const cat = new CatRecord({
    name, 
    gender,
    adopted,
    about,
    picture,
    gallery
  });

  return (
    <>
      <PreviewPage document={document}>
        <Cat cat={cat}></Cat>
      </PreviewPage>
    </>
  );
};

export default CatPreview;