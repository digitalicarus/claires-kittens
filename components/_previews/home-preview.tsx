import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import Home from "@/components/_main-views/home/home";
import PreviewPage from "@/components/_page-containers/preview-page";

interface HomePreviewProps extends PreviewTemplateComponentProps {}

const HomePreview: React.FC<HomePreviewProps> = ({ entry, document }) => {
  const title = entry.getIn(['data', 'title']);
  const banner = entry.getIn(['data', 'banner']);
  const aboutTheCats = entry.getIn(['data', 'body']);
  const momLink = entry.getIn(['data', 'mom-link']);
  const kittens = entry.getIn(['data', 'kittens']);

  return (
    <>
      <PreviewPage document={document}>
        <Home
          title={title}
          bannerImg={banner}
          aboutTheCats={aboutTheCats}
          momLink={momLink}
          kittens={kittens}
        ></Home> 
      </PreviewPage>
    </>
  );
};

export default HomePreview;