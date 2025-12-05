// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BroadcastsAPI from './broadcasts';
import { BroadcastContactsCursor } from './broadcasts';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Contacts extends APIResource {
  /**
   * List contacts in a broadcast with optional status filter.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const broadcastContact of client.broadcasts.contacts.list(
   *   'broadcastId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    broadcastID: string,
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BroadcastContactsCursor, BroadcastsAPI.BroadcastContact> {
    return this._client.getAPIList(
      path`/v1/broadcasts/${broadcastID}/contacts`,
      Cursor<BroadcastsAPI.BroadcastContact>,
      { query, ...options },
    );
  }

  /**
   * Add contacts to a broadcast in batch. Maximum 1000 contacts per request.
   *
   * @example
   * ```ts
   * const response = await client.broadcasts.contacts.add(
   *   'broadcastId',
   *   {
   *     contacts: [
   *       {
   *         recipient: '+14155551234',
   *         templateVariables: {
   *           name: 'John',
   *           order_id: 'ORD-001',
   *         },
   *       },
   *       {
   *         recipient: '+14155555678',
   *         templateVariables: {
   *           name: 'Jane',
   *           order_id: 'ORD-002',
   *         },
   *       },
   *     ],
   *   },
   * );
   * ```
   */
  add(broadcastID: string, body: ContactAddParams, options?: RequestOptions): APIPromise<ContactAddResponse> {
    return this._client.post(path`/v1/broadcasts/${broadcastID}/contacts`, { body, ...options });
  }

  /**
   * Remove a contact from a broadcast in draft status.
   *
   * @example
   * ```ts
   * await client.broadcasts.contacts.remove('contactId', {
   *   broadcastId: 'broadcastId',
   * });
   * ```
   */
  remove(contactID: string, params: ContactRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { broadcastId } = params;
    return this._client.delete(path`/v1/broadcasts/${broadcastId}/contacts/${contactID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ContactAddResponse {
  /**
   * Number of contacts successfully added.
   */
  added: number;

  /**
   * Number of duplicate contacts skipped.
   */
  duplicates: number;

  /**
   * Number of invalid contacts rejected.
   */
  invalid: number;

  /**
   * Details about invalid contacts.
   */
  errors?: Array<ContactAddResponse.Error>;
}

export namespace ContactAddResponse {
  export interface Error {
    reason?: string;

    recipient?: string;
  }
}

export interface ContactListParams extends CursorParams {
  /**
   * Status of a contact within a broadcast.
   */
  status?: BroadcastsAPI.BroadcastContactStatus;
}

export interface ContactAddParams {
  /**
   * List of contacts to add (max 1000 per request).
   */
  contacts: Array<ContactAddParams.Contact>;
}

export namespace ContactAddParams {
  export interface Contact {
    /**
     * Phone number (E.164) or email address.
     */
    recipient: string;

    /**
     * Per-contact template variables to personalize the message.
     */
    templateVariables?: { [key: string]: string };
  }
}

export interface ContactRemoveParams {
  broadcastId: string;
}

export declare namespace Contacts {
  export {
    type ContactAddResponse as ContactAddResponse,
    type ContactListParams as ContactListParams,
    type ContactAddParams as ContactAddParams,
    type ContactRemoveParams as ContactRemoveParams,
  };
}

export { type BroadcastContactsCursor };
