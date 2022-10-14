import { IGallerySource } from "@/root/shared-utilities-and-types";
import { PropsWithChildren, ReactComponentElement, useState } from "react";
import styles from './gallery.module.scss';

export interface IGalleryProps extends PropsWithChildren {
  sources: IGallerySource[]; // markdown
}


function getSourceContent (source: IGallerySource) {
  const isYoutube = /youtube/.test(source.src);
  const youtubeId = isYoutube ? source.src.match(/.*v=([^&]+)/)![1] : null;

  return isYoutube ? 
    <iframe 
      src={`https://www.youtube.com/embed/${youtubeId}`} 
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen></iframe>
    :
    <a target="_blank" href={source.src}><img src={`${source.src}?nf_resize=fit&w=300`} /></a>;
}

const Gallery: React.FC<IGalleryProps> = ({ sources = [] }) => {
  const [ modalMode, setModalMode ]= useState<boolean>(false);
  
  return (
    <div className={styles.gallery}>
      {
        sources.map((source: IGallerySource) => (
          <div key={source.src} className="gallery-item">
            {getSourceContent(source)}
            {source.description ? <aside>{source.description}</aside> : <></>}
          </div>
        ))
      }
    </div>
  );
};

export default Gallery;