import { E_INVALID_SEARCH_TERM, E_OAUTH_ERROR } from '../src/constants/errors';
import UnsplashSearch from '../src/index';
import { IResult } from '../src/typings/interface';

const accessKey =
  'a9b36d0ca18fc34ccf448bbb7ff86e580adb6ed0778b26a211dfc3c0d2fa3a90';

let result: Promise<IResult>;
const expectedResult = {
  images: expect.arrayContaining([expect.any(Object)]),
  totalImages: expect.any(Number),
  totalPages: expect.any(Number),
};

describe('Unsplash Search Tests', () => {
  let validInstance: UnsplashSearch;
  let invalidInstance: UnsplashSearch;

  beforeEach(() => {
    validInstance = new UnsplashSearch(accessKey);
    invalidInstance = new UnsplashSearch('mock-key');
  });

  it('Instance creation empty access key should throw an error', async () => {
    expect(() => new UnsplashSearch('')).toThrow();
  });

  it('Invalid API access key should throw an error.', async () => {
    result = invalidInstance.searchAll('istanbul');
    const expected: Error = new Error(E_OAUTH_ERROR);
    expect.assertions(1);
    return expect(result).rejects.toEqual(expected);
  });

  it('Instance creation', async () => {
    expect(validInstance).toBeInstanceOf(UnsplashSearch);
  });

  it('Get Query Limit and Remainin Query', () => {
    const queryLimit: number = validInstance.getQueryLimit();
    const remaining: number = validInstance.getRemaingQuery();
    expect(queryLimit).toBeGreaterThanOrEqual(0);
    expect(remaining).toBeGreaterThanOrEqual(0);
  });

  it('Get & Set Items per page', () => {
    let perPage: number = validInstance.getItemsPerPage();
    expect(perPage).toBeGreaterThanOrEqual(0);

    validInstance.setItemsPerPage(22);
    perPage = validInstance.getItemsPerPage();
    expect(perPage).toBe(22);
  });

  describe('Search All Method Tests', () => {
    it('Missing keyword or lenght is less than 3 should throw an error.', async () => {
      expect(() => validInstance.searchAll('a')).toThrow(E_INVALID_SEARCH_TERM);
    });

    it('Do search with no result', async () => {
      result = validInstance.searchAll('HHooppeeTTooNNooTTFFiinndd');
      const expected: IResult = { images: [], totalImages: 0, totalPages: 0 };
      expect.assertions(1);
      return expect(result).resolves.toEqual(expected);
    });

    it('Do search with some images in result', async () => {
      result = validInstance.searchAll('berlin');
      return expect(result).resolves.toMatchObject(expectedResult);
    });
  });

  describe('Search Portraits (Fail tests same as Search All)', () => {
    it('Do search with some images in result', async () => {
      result = validInstance.searchPortraits('istanbul');
      return expect(result).resolves.toMatchObject(expectedResult);
    });
  });

  describe('Search Landscape (Fail tests same as Search All)', () => {
    it('Do search with some images in result', async () => {
      result = validInstance.searchLandscapes('bali');
      return expect(result).resolves.toMatchObject(expectedResult);
    });
  });

  describe('Search Squarish (Fail tests same as Search All)', () => {
    it('Do search with some images in result', async () => {
      result = validInstance.searchSquares('tokyo');
      return expect(result).resolves.toMatchObject(expectedResult);
    });
  });
});
