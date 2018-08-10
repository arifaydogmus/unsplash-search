/**
 * Unsplash Search Helper
 *
 * Copyright (c) 2018, Arif Aydogmus <https://arifaydogmus.com>
 *
 */
import fetch from 'cross-fetch';
import { stringify } from 'query-string';
import IUnsplashSearch from './typings/abstracts';
import {
  Fetcher,
  Filter,
  IResult,
  IResultImage,
  ISearchParams,
  ITag,
  Orientation,
  Search,
  SearchBase,
} from './typings/interface';

import { E_INVALID_JSON_DATA, E_INVALID_SEARCH_TERM } from './constants/errors';
import {
  API_PAGE_MAX_ITEM,
  API_SEARCH_URL,
  API_VERSION,
  X_LIMIT,
  X_REMAIN,
} from './constants/index';

export default class UnsplashSearch extends IUnsplashSearch {
  protected queryLimit: number = 0;
  protected queryRemains: number = 0;

  constructor(accessKey: string, perPage: number = 10) {
    super(accessKey, Math.min(perPage, API_PAGE_MAX_ITEM));
  }

  public searchAll: Search = (query, page) =>
    this.search(query, page, Orientation.ALL);

  public searchLandscapes: Search = (query, page) =>
    this.search(query, page, Orientation.LANDSCAPE);

  public searchPortraits: Search = (query, page) =>
    this.search(query, page, Orientation.PORTRAIT);

  public searchSquares: Search = (query, page) =>
    this.search(query, page, Orientation.SQUARISH);

  public getQueryLimit = (): number => this.queryLimit;

  public getRemaingQuery = (): number => this.queryRemains;

  public getItemsPerPage = (): number => this.perPage;

  public setItemsPerPage = (limit: number = 10): void => {
    this.perPage = Math.min(limit, API_PAGE_MAX_ITEM);
  };

  protected fetcher: Fetcher = async params => {
    const url: string = API_SEARCH_URL + stringify(params);
    const fetchParams = {
      headers: {
        'Accept-Version': API_VERSION,
        Authorization: 'Client-ID ' + this.accessKey,
      },
    };
    const result: Promise<any> = await fetch(url, fetchParams)
      .then(response => {
        const { headers } = response;
        if (headers.has(X_LIMIT) && headers.has(X_REMAIN)) {
          this.queryLimit = parseInt(headers.get(X_LIMIT) || '0', 10);
          this.queryRemains = parseInt(headers.get(X_REMAIN) || '0', 10);
        }
        return response.json();
      })
      .then(json => JSON.stringify(json))
      .catch(error => error.message);
    return result;
  };

  protected filter: Filter = imgArray => {
    if (!Array.isArray(imgArray)) {
      throw new Error(E_INVALID_JSON_DATA);
    }
    return imgArray.map(
      (data: any): IResultImage => ({
        author: {
          name: data.user.name,
          picture: data.user.profile_image.small,
          profile: data.user.links.html,
        },
        color: data.color,
        description: data.description,
        height: data.height,
        id: data.id,
        likes: data.likes,
        tags: data.tags.map((tag: ITag) => tag.title),
        updated: data.updated_at,
        urls: {
          creditLink: data.links.html,
          full: data.urls.full,
          raw: data.urls.raw,
          thumb: data.urls.thumb,
        },
        width: data.width,
      })
    );
  };

  protected search: SearchBase = (
    query,
    page = 1,
    orientation = Orientation.ALL
  ) => {
    const params: ISearchParams = {
      orientation,
      page,
      per_page: this.perPage,
      query,
    };

    if (!params.query || params.query.length < 3) {
      throw new Error(E_INVALID_SEARCH_TERM);
    }

    if (orientation === Orientation.ALL) {
      delete params.orientation;
    }

    return this.fetcher(params).then(
      (result): IResult => {
        const json: any = JSON.parse(result);
        if (json.errors) {
          throw new Error(json.errors);
        }
        return {
          images: this.filter(json.results),
          totalImages: json.total,
          totalPages: json.total_pages,
        };
      }
    );
  };
}
