import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";

interface IAdoptionInfoProps extends PropsWithChildren {
  content: string; // markdown
}

const AdoptionInfo: React.FC<IAdoptionInfoProps> = ({ content }) => (
  <div className="subpage-container">
    <header className="subpage-header">
      Adoption Info
    </header>
    <ReactMarkdown>{ content }</ReactMarkdown>
  </div>
);

export default AdoptionInfo;