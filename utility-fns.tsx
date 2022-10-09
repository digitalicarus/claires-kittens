import ReactMarkdown from "react-markdown";
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

export const scrollToTop = (ele: HTMLElement | Window | null = window, smooth: boolean = true) => {
  if (ele === null) { 
    throw "scrollToTop: ele is null, current value of ref is probably not mounted";
  }
  ele.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
}