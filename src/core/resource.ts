import type { Zavudev } from '../client';

export abstract class APIResource {
  protected _client: Zavudev;

  constructor(client: Zavudev) {
    this._client = client;
  }
}
