import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

//-- Convenience function to render some markdown in react
export const renderMarkdown = (markdown: string, className = "") => (
  <ReactMarkdown 
    className={className} 
    remarkPlugins={[remarkGfm]} 
    rehypePlugins={[rehypeSlug]}
    children={markdown}
  />
);