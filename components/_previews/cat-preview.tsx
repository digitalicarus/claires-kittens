import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

interface CatPreviewProps extends PreviewTemplateComponentProps {}

const CatPreview: React.FC<CatPreviewProps> = ({ entry }) => {
  const name = entry.getIn(['data', 'name']);
  const pictures = entry.getIn(['data', 'pictures']);
  const body = entry.getIn(['data', 'body']);

  return (
    <>
      Cat Page Preview 
    </>
  );
};

export default CatPreview;