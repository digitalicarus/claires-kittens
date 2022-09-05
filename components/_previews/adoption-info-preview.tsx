import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import AdoptionInfo from "pages/adoption-info";

interface AdoptionInfoPreviewProps extends PreviewTemplateComponentProps {}

const AdoptionInfoPreview: React.FC<AdoptionInfoPreviewProps> = ({ entry }) => {
  const body = entry.getIn(['data', 'body']);

  return (
    <AdoptionInfo content={body}></AdoptionInfo>
  );
};

export default AdoptionInfoPreview;