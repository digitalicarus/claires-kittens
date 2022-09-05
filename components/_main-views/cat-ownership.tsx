import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";

interface ICatOwnershipProps extends PropsWithChildren {
  content: string; // markdown
}

const CatOwnership: React.FC<ICatOwnershipProps> = ({ content }) => (
  <div className="subpage-container">
    <header className="subpage-header">
      Cat Ownership Tips
    </header>
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

export default CatOwnership;