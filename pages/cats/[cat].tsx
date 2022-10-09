import { GetStaticPaths, GetStaticProps } from "next";
import SitePage from "@/components/_page-containers/site-page";
import Cat, { ICatProps } from '@/components/_main-views/cat/cat';
import { ParsedUrlQuery } from "querystring";

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
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const slugs = keys.map((key: string, index: any) => {
      let slug = key
        .replace(/^.*[\\\/]/, '') // remove directory
        .slice(0, -3); // remove file extension

      return slug;
    });
    return slugs;
  })(require.context('@/content/cats', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/cats/${slug}`)

  return {
    paths,
    fallback: false,
  }
};

interface ICatUrlParams extends ParsedUrlQuery {
  cat: string
}
export const getStaticProps: GetStaticProps<ICatProps> = async ({ ...ctx }) => {
  const { cat } = ctx.params as ICatUrlParams;
  const { attributes, body }= await import(`@/content/cats/${cat}.md`);

  return {
    props: {
      name: attributes.name,
      featuredPicture: attributes['featured_picture'],
      gallerySources: attributes.gallery || [],
      about: body
    }
  };
};