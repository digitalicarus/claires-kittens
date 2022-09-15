import { GetStaticPaths, GetStaticProps } from "next";
import SitePage from "@/components/_page-containers/site-page";
import Cat, { ICatProps } from '@/components/_main-views/cat';
import { PropsWithChildren } from "react";
import { IGallerySource } from "@/components/gallery/gallery";

const CatPage: React.FC<ICatProps> = ({
  name, featuredPicture, about, gallerySources
}) => {
  
  return (
    <SitePage>
      <Cat
        name={name}
        featuredPicture={featuredPicture}
        about={about}
        gallerySources={gallerySources}
      ></Cat>
    </SitePage>
  );
};

export default CatPage;

//-- WIP ignore this
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'fake' } }, { params: { id: 'fake2' } }],
    fallback: false, // can also be true or 'blocking'
  }
};

export const getStaticProps: GetStaticProps<ICatProps> = async () => {
  return { 
    props: { 
      name: '',
      featuredPicture: '',
      about: '',
      gallerySources: []
    }
  }
};