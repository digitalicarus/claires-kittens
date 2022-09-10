import { PropsWithChildren } from "react";

export interface IHomeProps extends PropsWithChildren {
  title: string;
  bannerImg: string;
  aboutTheCats?: string; // markdown 
  kittens?: KittenSummaryInfo[]
}

export interface IKittenSummaryLink {
  name: string;
  slug: string;
}
export interface IKittenSummaryInfoParams {
  description: string,
  picture: string,
  link: string
}
export class KittenSummaryInfo {
  public description: string;
  public picture: string;
  public link: IKittenSummaryLink;

  constructor({ description, picture, link }: IKittenSummaryInfoParams) { 
      this.description = description;
      this.picture = picture;
      this.link = JSON.parse(link) as IKittenSummaryLink;
  }
}

