import Gallery from "@/components/gallery/gallery";
import { IHomeProps, KittenSummaryInfo } from "./home.types";
import styles from './home.module.scss';
import Link from "next/link";
import { renderMarkdown } from "utility-fns";

const Home: React.FC<IHomeProps> = ({
  title, 
  bannerImg, 
  aboutTheCats = '', 
  kittens = [],
  gallerySources = []
}) => (
  <div className={styles.home}>
    <header style={ {backgroundImage: `url('${bannerImg}'`} }>
      <h1>{ title }</h1>
    </header>
    <main className="subpage-container">
      <section>
        <header className="subpage-header">About Claire</header>
        {renderMarkdown(aboutTheCats)}
      </section>
      <section id="the-kittens">
        <header className="subpage-header">The Kittens</header>
        <div className="kittens-container">
          {
            kittens.map((kittenInfo: KittenSummaryInfo, index: number) => (
              <div className="kitten-summary" key={index}>
                <div>
                  <h2><Link href={`/cats/${kittenInfo.link.slug}`}>{kittenInfo.link.name}</Link></h2>
                  <Link href={`/cats/${kittenInfo.link.slug}`}><a><img src={kittenInfo.picture} /></a></Link>
                </div>
                <div className="description">
                  {kittenInfo.description} 
                  <aside>
                    <Link href={`/cats/${kittenInfo.link.slug}`}>
                      <a>[ see more about {kittenInfo.link.name} ]</a>
                    </Link>
                  </aside>
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