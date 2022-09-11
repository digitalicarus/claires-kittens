import Gallery from "@/components/gallery/gallery";
import ReactMarkdown from "react-markdown";
import { IHomeProps, KittenSummaryInfo } from "./home.types";
import styles from './home.module.scss';
import Image from "next/image";
import Link from "next/link";

const KittenSummary: React.FC<KittenSummaryInfo> = ({ description, picture, link }) => {
  return (
    <div className="kitten-summary">
      <img src={'/'+picture} />
      {link.name}
      <p>
        {description}
        <br/>
      </p>
    </div>
  );
};

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
        <div className="kittens-container">
          {
            kittens.map((kittenInfo: KittenSummaryInfo) => (
              <div className="kitten-summary">
                <div>
                  <h2><Link href={`/cats/${kittenInfo.link.slug}`}>{kittenInfo.link.name}</Link></h2>
                  <Link href={`/cats/${kittenInfo.link.slug}`}><img src={'/'+kittenInfo.picture} /></Link>
                </div>
                <div className="description">
                  {kittenInfo.description}
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