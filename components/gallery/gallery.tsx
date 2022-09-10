import { PropsWithChildren, ReactComponentElement, useState } from "react";
import styles from './gallery.module.scss';

export interface IGalleryProps extends PropsWithChildren {
  sources: IGallerySource[]; // markdown
}

export interface IGallerySource {
  description?: string;
  src: string;
}

function getSourceContent (source: IGallerySource) {
  const isYoutube = /youtube/.test(source.src);
  const youtubeId = isYoutube ? source.src.match(/.*v=([^&]+)/)![1] : null;

  console.log('source!', source);

  return isYoutube ? 
    <iframe 
      width="560" 
      height="315" 
      src={`https://www.youtube.com/embed/${youtubeId}`} 
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen></iframe>
    :
    <img src={source.src} />;
}

const Gallery: React.FC<IGalleryProps> = ({ sources = [] }) => {
  const [ modalMode, setModalMode ]= useState<boolean>(false);
  
  return (
    <>
      {
        sources.map((source: IGallerySource) => (
          <div key={source.src} className={styles['gallery-item']}>
            {getSourceContent(source)}
            {source.description ? <aside>{source.description}</aside> : <></>}
          </div>
        ))
      }
    </>
  );
};

export default Gallery;