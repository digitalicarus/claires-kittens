import CatOwnership from "@/components/_main-views/cat-ownership";
import SitePage from "@/components/_page-containers/site-page";
import { GetStaticProps } from "next";
import { body } from '../content/cat-ownership.md'

interface ICatOwnershipPageProps {
  content: string; // markdown
}

const CatOwnershipPage: React.FC<ICatOwnershipPageProps> = ({ content }) => (
  <SitePage subtitle="Ownership Tips">
    <CatOwnership content={content}></CatOwnership>
  </SitePage>
);

export default CatOwnershipPage;

export const getStaticProps: GetStaticProps<ICatOwnershipPageProps> = async () => {
  return { 
    props: { 
      content: body
    }
  }
};