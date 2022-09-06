import React from "react";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import Home from "@/components/_main-views/home/home";
import PreviewPage from "@/components/_page-containers/preview-page";
import { IKittenSummaryInfoParams, KittenSummaryInfo } from "../_main-views/home/home.types";

interface HomePreviewProps extends PreviewTemplateComponentProps {}

const HomePreview: React.FC<HomePreviewProps> = ({ entry, document }) => {
  const title = entry.getIn(['data', 'title']);
  const banner = entry.getIn(['data', 'banner']);
  const aboutTheCats = entry.getIn(['data', 'body']);
  const kittens = entry
    .getIn(['data', 'kittens'])
    .toJS() // convert immutableJS map data to JS regular object
    .map((kitten: IKittenSummaryInfoParams) => new KittenSummaryInfo(kitten));

  return (
    <>
      <PreviewPage document={document}>
        <Home
          title={title}
          bannerImg={banner}
          aboutTheCats={aboutTheCats}
          kittens={kittens}
        ></Home> 
      </PreviewPage>
    </>
  );
};

export default HomePreview;