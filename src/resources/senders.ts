// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Senders extends APIResource {
  /**
   * Create sender
   */
  create(body: SenderCreateParams, options?: RequestOptions): APIPromise<Sender> {
    return this._client.post('/v1/senders', { body, ...options });
  }

  /**
   * Get sender
   */
  retrieve(senderID: string, options?: RequestOptions): APIPromise<Sender> {
    return this._client.get(path`/v1/senders/${senderID}`, options);
  }

  /**
   * Update sender
   */
  update(senderID: string, body: SenderUpdateParams, options?: RequestOptions): APIPromise<Sender> {
    return this._client.patch(path`/v1/senders/${senderID}`, { body, ...options });
  }

  /**
   * List senders
   */
  list(
    query: SenderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SendersCursor, Sender> {
    return this._client.getAPIList('/v1/senders', Cursor<Sender>, { query, ...options });
  }

  /**
   * Delete sender
   */
  delete(senderID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/senders/${senderID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type SendersCursor = Cursor<Sender>;

export interface Sender {
  id: string;

  name: string;

  /**
   * Phone number in E.164 format.
   */
  phoneNumber: string;

  createdAt?: string;

  /**
   * Whether this sender is the project's default.
   */
  isDefault?: boolean;

  updatedAt?: string;
}

export interface SenderCreateParams {
  name: string;

  phoneNumber: string;

  setAsDefault?: boolean;
}

export interface SenderUpdateParams {
  name?: string;

  setAsDefault?: boolean;
}

export interface SenderListParams extends CursorParams {}

export declare namespace Senders {
  export {
    type Sender as Sender,
    type SendersCursor as SendersCursor,
    type SenderCreateParams as SenderCreateParams,
    type SenderUpdateParams as SenderUpdateParams,
    type SenderListParams as SenderListParams,
  };
}
