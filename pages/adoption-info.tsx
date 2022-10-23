import { GetStaticProps } from "next";
import { body } from '../content/adoption-info.md'
import SitePage from "@/components/_page-containers/site-page";
import AdoptionInfo from "@/root/components/_main-views/adoption-info/adoption-info";

interface IAdoptionInfoPageProps {
  content: string; // markdown
}

const AdoptionInfoPage: React.FC<IAdoptionInfoPageProps> = ({ content }) => (
  <SitePage>
    <AdoptionInfo content={content}></AdoptionInfo>
  </SitePage>
);

export default AdoptionInfoPage;

export const getStaticProps: GetStaticProps<IAdoptionInfoPageProps> = async () => {
  return { 
    props: { 
      content: body 
    }
  }
};