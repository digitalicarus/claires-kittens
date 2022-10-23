import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import AdoptionInfo from "@/root/components/_main-views/adoption-info/adoption-info";
import PreviewPage from "../_page-containers/preview-page";

interface AdoptionInfoPreviewProps extends PreviewTemplateComponentProps {}

const AdoptionInfoPreview: React.FC<AdoptionInfoPreviewProps> = ({ entry, document }) => {
  const body = entry.getIn(['data', 'body']);

  return (
    <PreviewPage document={document}>
      <AdoptionInfo content={body}></AdoptionInfo>
    </PreviewPage>
  );
};

export default AdoptionInfoPreview;