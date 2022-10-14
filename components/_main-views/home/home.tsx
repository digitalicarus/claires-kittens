import Gallery from "@/components/gallery/gallery";
import { IHomeProps, IHomeCatSummary} from "./home.types";
import styles from './home.module.scss';
import Link from "next/link";
import { CatGenders, renderMarkdown } from "@/root/shared-utilities-and-types";

const Home: React.FC<IHomeProps> = ({
  title, 
  bannerImg, 
  about = '', 
  cats = [],
  gallerySources = []
}) => (
  <div className={styles.home}>
    <header style={ {backgroundImage: `url('${bannerImg}'`} }>
      <h1>{ title }</h1>
    </header>
    <main className="subpage-container">
      <section>
        <header className="subpage-header">About Claire</header>
        {renderMarkdown(about)}
      </section>
      <section id="the-kittens">
        <header className="subpage-header">The Kittens</header>
        <div className="kittens-container">
          {
            cats.map((cat: IHomeCatSummary, index: number) => (
              <div className="kitten-summary" key={index}>
                <div>
                  <h2>
                    <Link href={cat.link}>{cat.name}</Link>
                    {
                      cat.gender === CatGenders.Male ? '  (M)' :
                      cat.gender === CatGenders.Female ? '  (F)' :
                      ''
                    }
                  </h2>
                  <Link href={cat.link}><a><img src={cat.picture || ''} /></a></Link>
                </div>
                <div className="description">
                  <p>
                    <strong>Gender</strong> : &nbsp; {cat.gender} <br/>
                    <strong>Adoption Status</strong> : &nbsp;
                      {
                        cat.adopted ? `${cat.name} has been adopted! 🎉` :
                        `${cat.name} still needs a forever home 🥺`
                      }
                  </p>
                  {cat.about} 
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <section id="gallery">
        <header className="subpage-header">Gallery</header>
        <Gallery sources={gallerySources}></Gallery>
      </section>
    </main>
  </div>
);

export default Home;