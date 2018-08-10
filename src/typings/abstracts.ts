import { E_INVALID_ACCESS_KEY } from '../constants/errors';

export default abstract class IUnsplashSearch {
  protected perPage: number;
  protected accessKey: string;

  constructor(accessKey: string, perPage: number) {
    if (!accessKey) {
      throw new Error(E_INVALID_ACCESS_KEY);
    }
    this.accessKey = accessKey;
    this.perPage = perPage;
  }
}
