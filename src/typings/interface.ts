export enum Orientation {
  ALL = '',
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
  SQUARISH = 'squarish',
}

export interface IResultImage {
  id: string;
  updated: string;
  width: number;
  height: number;
  color: string;
  description: string;
  urls: {
    raw: string;
    full: string;
    thumb: string;
    creditLink: string;
  };
  likes: number;
  tags: string[];
  author: {
    name: string;
    picture: string;
    profile: string;
  };
}

export interface IResult {
  totalImages: number;
  totalPages: number;
  images: IResultImage[] | Error;
}

export interface ISearchParams {
  query: string;
  page: number;
  per_page: number;
  orientation?: Orientation;
}

export interface ITag {
  title: string;
}

export type Filter = (imgArray: object[]) => IResultImage[] | Error;

export type SearchBase = (
  query: string,
  page: number,
  orientation?: Orientation
) => Promise<IResult>;

export type Search = (query: string, page?) => Promise<IResult>;

export type Fetcher = (params: ISearchParams) => Promise<string>;
