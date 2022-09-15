import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import Gallery, { IGallerySource } from "../gallery/gallery";

export interface ICatProps extends PropsWithChildren { 
  name: string;
  featuredPicture: string;
  about: string; //markdown
  gallerySources: IGallerySource[];
}

const Cat: React.FC<ICatProps> = ({ name, featuredPicture, about, gallerySources = [] }) => (
  <div className="">
    <main className="subpage-container">
      <section>
        <header className="subpage-header">{name}</header>
        <img src={featuredPicture} />
        <ReactMarkdown>{about}</ReactMarkdown>
      </section>
      <section>
        <header className="subpage-header">Pics and Vids of {name}</header>
        <Gallery sources={gallerySources}></Gallery>
      </section>

    </main>
  </div>
);

export default Cat;