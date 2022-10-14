import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export enum CatGenders {
  Male = 'Male',
  Female = 'Female'
}

export interface IGallerySource {
  description?: string;
  src: string;
}

//-- Convenience function to render some markdown in react
export const renderMarkdown = (markdown: string, className = "") => (
  <ReactMarkdown
    className={className}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeSlug]}
    children={markdown}
  />
);

export const scrollToTop = (
  ele: HTMLElement | Window | null = window,
  smooth: boolean = true
) => {
  if (ele === null) {
    throw "scrollToTop: ele is null, current value of ref is probably not mounted";
  }
  ele.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
};

export const catNameToUrl = (name: string): string => `/cats/${name}`;

export const getCatNames = (): string[] => {
  return ((context) => {
    const keys = context.keys();
    const names = keys.map((key: string, index: any) => {
      let slug = key
        .replace(/^.*[\\\/]/, "") // remove directory
        .slice(0, -3); // remove file extension

      return slug;
    });
    return names;
  })(require.context("@/content/cats", true, /\.md$/));
};

export const catGenderFromString = (gender?: string): CatGenders|null => {
  return (
    gender === 'Male' ? CatGenders.Male :
    gender === 'Female' ? CatGenders.Female :
    null
  );
}
  
export const catAdoptedFromString = (adopted?: string): boolean|null => {
  return (
    adopted === 'Yes' ? true : 
    adopted === 'No' ? false :
    null
  );
}

//-- find backtick strings and escape the double quotes, then remove backticks 
export const parseWeirdJSONString = (weirdJSON: string): any => 
  JSON.parse(
    weirdJSON
      // find JSON strings containing surrounding backticks, this indicates the need to escape double quotes
      .replace(/(`[^\`]*\`)/g, (match: string) => match
        // escape the double quotes
        .replace(/"/g, '\\"')
        // remove the backtick indicators
        .replace(/`/g, '') 
      )
  );