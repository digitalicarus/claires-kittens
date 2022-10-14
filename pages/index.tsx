import Head from "next/head"
import { GetStaticProps } from "next";

import Home from "@/components/_main-views/home/home";
import SitePage from "@/components/_page-containers/site-page";
import { HomeCatSummary, IHomeCatFromMarkdown, IHomeCatSummary, IHomeCatSummaryParams, IHomeProps } from "@/components/_main-views/home/home.types";

import { attributes } from '../content/home.md'
import { PropsWithChildren } from "react";
import { IGallerySource, parseWeirdJSONString } from "../shared-utilities-and-types";

export interface IIndexProps extends PropsWithChildren {
  title: string;
  bannerImg: string;
  about: string; // markdown 
  catsUnparsed: string[],
  gallerySources: IGallerySource[]
}

const IndexPage: React.FC<IIndexProps> = ({
  title, bannerImg, about, catsUnparsed = [], gallerySources
}) => {

  const catSummaries = catsUnparsed 
    .map((catUnparsed: string) => parseWeirdJSONString(catUnparsed))
    .map((cat: IHomeCatSummaryParams) => new HomeCatSummary(cat));
  
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <SitePage>
        <Home
          title={title}
          bannerImg={bannerImg}
          about={about}
          cats={catSummaries}
          gallerySources={gallerySources}
        ></Home>
      </SitePage>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IIndexProps> = async () => {
  return { 
    props: { 
      title: attributes.title, 
      bannerImg: attributes.banner,
      about: attributes.about,
      //-- direct from markdown - getStaticProps members must be JSON serializable objects
      //-- So we'll have to make this a proper object instance in the component to be safe
      // https://nextjs.org/docs/api-reference/data-fetching/get-static-props
      catsUnparsed: attributes.cats.map((catFromMarkdown: IHomeCatFromMarkdown) => catFromMarkdown.catSummary),
      gallerySources: attributes.gallery
    }
  }
};