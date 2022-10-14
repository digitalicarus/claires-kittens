import React from 'react';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import Home from '@/components/_main-views/home/home';
import PreviewPage from '@/components/_page-containers/preview-page';
import { HomeCatSummary, IHomeCatFromMarkdown, IHomeCatSummaryParams } from '../_main-views/home/home.types';
import { IGallerySource, parseWeirdJSONString } from '@/root/shared-utilities-and-types';

interface HomePreviewProps extends PreviewTemplateComponentProps {}

const HomePreview: React.FC<HomePreviewProps> = ({ entry, document }) => {
  const title = entry.getIn(['data', 'title']);
  const banner = entry.getIn(['data', 'banner']);
  const aboutTheCats = entry.getIn(['data', 'about']);
  const catsFromMarkdown = entry.getIn(['data', 'cats']).toJS(); // convert immutableJS map data to JS regular object

  const cats = (catsFromMarkdown || [])
    // when you first start adding in the CMS editor it's an empty array :(
    .filter((catFromMarkdown: IHomeCatFromMarkdown) => 'catSummary' in catFromMarkdown)
    .map((catFromMarkdown: IHomeCatFromMarkdown) => parseWeirdJSONString(catFromMarkdown.catSummary))
    .map((cat: IHomeCatSummaryParams) => new HomeCatSummary(cat));

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
        <Home title={title} bannerImg={banner} about={aboutTheCats} cats={cats} gallerySources={gallerySources}></Home>
      </PreviewPage>
    </>
  );
};

export default HomePreview;
