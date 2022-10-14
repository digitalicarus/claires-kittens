import { catAdoptedFromString, catGenderFromString, CatGenders, catNameToUrl, IGallerySource } from "@/root/shared-utilities-and-types";

export interface ICatRecord {
  name: string;
  link: string;
  gender: CatGenders|null;
  adopted: boolean|null;
  about: string;
  picture?: string|null;
  gallery: IGallerySource[];
}
//-- from the parsed markdown
export interface ICatRecordParams {
  name: string;
  gender: string;
  adopted: string;
  about: string;
  picture: string|null;
  gallery: IGallerySource[]
}
export class CatRecord implements ICatRecord {
  name: string;
  link: string;
  gender: CatGenders|null;
  adopted: boolean|null;
  about: string;
  picture: string|null;
  gallery: IGallerySource[];

  constructor({ name, gender, adopted, about, picture = null, gallery = []}: ICatRecordParams) {
    this.name = name;
    this.link = catNameToUrl(name); 
    this.gender = catGenderFromString(gender);
    this.adopted = catAdoptedFromString(adopted);
    this.about = about;
    this.picture = picture;
    this.gallery = gallery;
  }
}