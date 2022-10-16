import { CatGenders, renderMarkdown } from "@/root/shared-utilities-and-types";
import { ICatRecord } from "./cat.types";
import Gallery from "../../gallery/gallery";

import styles from './cat.module.scss';

export interface ICatProps {
  cat: ICatRecord
} 

const Cat: React.FC<ICatProps> = ({ cat }) => (
  <div className={styles.cat}>
    <main className="subpage-container">
      <section className="max-w-screen-sm" >
        <header className="subpage-header">
          {cat.name ? cat.name : '[ cat name ]'} 
        </header>
        { cat.picture ? <img className="featured-image" src={`${cat.picture}`} /> : null }
        <p>
          <strong>Gender</strong> : &nbsp; {cat.gender} <br/>
          <strong>Adoption Status</strong> : &nbsp;
          {
            cat.adopted ? `${cat.name} has been adopted! 🎉` :
            `${cat.name} still needs a forever home 🥺`
          }
        </p>
        {renderMarkdown(cat.about)}
      </section>
      { 
        cat.gallery.length > 0 ? (
          <section>
            <header className="subpage-header">Gallery</header>
            <Gallery sources={cat.gallery}></Gallery>
          </section>
        ) : null
      }
    </main>
  </div>
);

export default Cat;