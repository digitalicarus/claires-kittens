import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import SitePage from "@/components/_page-containers/site-page";
import Cat, { ICatProps } from '@/components/_main-views/cat/cat';
import { CatRecord } from "@/main-views/cat/cat.types";
import { catNameToUrl, getCatNames, IGallerySource } from "@/root/shared-utilities-and-types";

export interface ICatPageProps {
  name: string;
  gender: string;
  adopted: string;
  about: string;
  picture: string;
  gallery: IGallerySource[];
}

const CatPage: React.FC<ICatPageProps> = ({
  name, gender, adopted, about, picture, gallery
}) => {

  const cat = new CatRecord({
    name, gender, adopted, about, picture, gallery
  });

  return (
    <SitePage>
      <Cat cat={cat}></Cat>
    </SitePage>
  );
};

export default CatPage;

//-- WIP ignore this
export const getStaticPaths: GetStaticPaths = async () => {
  const catNames = getCatNames();
  const paths = catNames.map(catNameToUrl);

  return {
    paths,
    fallback: false,
  }
};

interface ICatUrlParams extends ParsedUrlQuery {
  cat: string
}
export const getStaticProps: GetStaticProps<ICatPageProps> = async ({ ...ctx }) => {
  const { cat } = ctx.params as ICatUrlParams;
  const { attributes, body } = await import(`@/content/cats/${cat}.md`);

  return {
    props: { 
      name: attributes.name,
      gender: attributes.gender,
      adopted: attributes.adopted,
      about: attributes.about,
      picture: attributes.picture,
      gallery: attributes.gallery || []
    }
  };
};