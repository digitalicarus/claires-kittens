import { PropsWithChildren } from "react";
import { renderMarkdown } from "utility-fns";

interface ICatOwnershipProps extends PropsWithChildren {
  content: string; // markdown
}

const CatOwnership: React.FC<ICatOwnershipProps> = ({ content }) => (
  <div className="subpage-container">
    <header className="subpage-header">
      Care Tips
    </header>
    {renderMarkdown(content)}
  </div>
);

export default CatOwnership;