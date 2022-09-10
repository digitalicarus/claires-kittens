import Gallery from "@/components/gallery/gallery";
import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import styles from './home.module.scss';
import { IHomeProps, KittenSummaryInfo } from "./home.types";
import KittenSummary from "./kitten-summary/kitten-summary";

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
        <ReactMarkdown>{aboutTheCats}</ReactMarkdown>
      </section>
      <section id="the-kittens">
        <header className="subpage-header">The Kittens</header>
        {
          kittens.map((kittenInfo: KittenSummaryInfo) => (
            <KittenSummary 
              description={kittenInfo.description} 
              picture={kittenInfo.picture} 
              link={kittenInfo.link}
            ></KittenSummary>  
          ))
        }
      </section>
      <section id="gallery">
        <header className="subpage-header">Gallery</header>
        <Gallery sources={gallerySources}></Gallery>
      </section>
    </main>
  </div>
);

export default Home;