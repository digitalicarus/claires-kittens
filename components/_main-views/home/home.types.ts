import { catAdoptedFromString, catGenderFromString, CatGenders, catNameToUrl, IGallerySource } from "@/root/shared-utilities-and-types";
import { PropsWithChildren } from "react";

export interface IHomeCatFromMarkdown {
  catSummary: string; // unparsed JSON
}

export interface IHomeCatSummary {
  name: string;
  link: string;
  gender: CatGenders|null;
  adopted: boolean|null;
  picture: string;
  about: string;
} 

export interface IHomeCatSummaryParams {
  name: string;
  slug: string;
  gender: string;
  adopted: string;
  picture: string;
  about: string;
}

export class HomeCatSummary implements IHomeCatSummary {
  name: string;
  link: string;
  gender: CatGenders|null;
  adopted: boolean|null;
  picture: string;
  about: string;

  constructor ({ name, slug, gender, adopted, picture, about }: IHomeCatSummaryParams) {
    this.name = name;
    this.link = catNameToUrl(slug);
    this.gender = catGenderFromString(gender);
    this.adopted = catAdoptedFromString(adopted);
    this.picture = picture;
    this.about = about;
  }
}

export interface IHomeProps extends PropsWithChildren {
  title: string;
  bannerImg: string;
  about: string; // markdown 
  cats: IHomeCatSummary[],
  gallerySources?: IGallerySource[]
}