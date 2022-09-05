import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import styles from './home.module.scss';

export interface IHomeProps extends PropsWithChildren {
  title: string;
  bannerImg: string;
  aboutTheCats?: string; // markdown 
  momLink: string;
  kittens?: IKittenInfo[]
}

export interface IKittenInfo {
  description: string; // markdown
  picture: string;
  link: string;
}

const Home: React.FC<IHomeProps> = ({
  title, 
  bannerImg, 
  aboutTheCats = '', 
  momLink, 
  kittens = []
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
        {kittens.map(kitten => JSON.stringify(kitten))}
      </section>
      <section id="gallery">
        <header className="subpage-header">Gallery</header>
      </section>
    </main>
  </div>
);

export default Home;