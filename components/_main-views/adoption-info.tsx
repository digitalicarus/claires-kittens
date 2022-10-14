import { PropsWithChildren } from "react";
import { renderMarkdown } from "@/root/shared-utilities-and-types";

interface IAdoptionInfoProps extends PropsWithChildren {
  content: string; // markdown
}

const AdoptionInfo: React.FC<IAdoptionInfoProps> = ({ content }) => (
  <div className="subpage-container">
    <header className="subpage-header">
      Adoption Info
    </header>
    {renderMarkdown(content)}
  </div>
);

export default AdoptionInfo;