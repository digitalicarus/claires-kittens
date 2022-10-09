import { PropsWithChildren } from "react";
import { renderMarkdown } from "utility-fns";
import Gallery, { IGallerySource } from "../../gallery/gallery";
import styles from './cat.module.scss';

export interface ICatProps extends PropsWithChildren { 
  name: string;
  featuredPicture: string;
  about: string; //markdown
  gallerySources: IGallerySource[];
}

const Cat: React.FC<ICatProps> = ({ name, featuredPicture, about, gallerySources = [] }) => (
  <div className={styles.cat}>
    <main className="subpage-container">
      <section className="max-w-screen-sm" >
        <header className="subpage-header">{name ? name : '[ cat name ]'}</header>
        { featuredPicture ? <img className="featured-image" src={`${featuredPicture}?nf_resize=fit&w=600`} /> : null }
        {renderMarkdown(about)}
      </section>
      <section>
        <header className="subpage-header">Gallery</header>
        <Gallery sources={gallerySources}></Gallery>
      </section>

    </main>
  </div>
);

export default Cat;