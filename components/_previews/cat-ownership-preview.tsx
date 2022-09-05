import CatOwnership from "@/components/_main-views/cat-ownership";
import PreviewPage from "@/components/_page-containers/preview-page";
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

interface ICatOwnershipPreviewProps extends PreviewTemplateComponentProps {}

const CatOwnershipPreview: React.FC<ICatOwnershipPreviewProps> = ({ entry, document }) => {
  const body = entry.getIn(['data', 'body']);

  return (
    <PreviewPage document={document}>
      <CatOwnership content={body}></CatOwnership>
    </PreviewPage>
  );
}

export default CatOwnershipPreview;
