import Head from "next/head"
import { GetStaticProps } from "next";
import Home, { IHomeProps } from "@/components/_main-views/home/home";
import { body, attributes } from '../content/home.md'
import SitePage from "@/components/_page-containers/site-page";


const IndexPage: React.FC<IHomeProps> = ({
  title, bannerImg, aboutTheCats, momLink, kittens = []
}) => (
  <>
    <Head>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </Head>
    <SitePage>
      <Home
        title={title}
        bannerImg={bannerImg}
        aboutTheCats={aboutTheCats}
        momLink={momLink}
        kittens={kittens}
      ></Home>
    </SitePage>
  </>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  return { 
    props: { 
      title: attributes.title, 
      bannerImg: attributes.banner,
      aboutTheCats: body,
      momLink: attributes['mom-link'],
      kittens: attributes.kittens
    }
  }
};