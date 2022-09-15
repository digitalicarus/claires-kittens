import Head from "next/head"
import { GetStaticProps } from "next";

import Home from "@/components/_main-views/home/home";
import SitePage from "@/components/_page-containers/site-page";
import { IHomeProps, IKittenSummaryInfoParams, KittenSummaryInfo} from "@/components/_main-views/home/home.types";

import { body, attributes } from '../content/home.md'
import { PropsWithChildren } from "react";
import { IGallerySource } from "@/components/gallery/gallery";

export interface IIndexProps extends PropsWithChildren {
  title: string;
  bannerImg: string;
  aboutTheCats?: string; // markdown 
  kittens?: IKittenSummaryInfoParams[],
  gallerySources: IGallerySource[]
}

const IndexPage: React.FC<IIndexProps> = ({
  title, bannerImg, aboutTheCats, kittens = [], gallerySources
}) => {
  const kittensTransformed = kittens.map((kitten: IKittenSummaryInfoParams) => new KittenSummaryInfo(kitten));
  
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <SitePage>
        <Home
          title={title}
          bannerImg={bannerImg}
          aboutTheCats={aboutTheCats}
          kittens={kittensTransformed}
          gallerySources={gallerySources}
        ></Home>
      </SitePage>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  return { 
    props: { 
      title: attributes.title, 
      bannerImg: attributes.banner,
      aboutTheCats: body,
      //-- direct from markdown - getStaticProps members must be JSON serializable objects
      // https://nextjs.org/docs/api-reference/data-fetching/get-static-props
      kittens: attributes.kittens,
      gallerySources: attributes.gallery
    }
  }
};