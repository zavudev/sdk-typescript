// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ContactsAPI from './contacts';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Channels extends APIResource {
  /**
   * Update a contact's channel properties.
   *
   * @example
   * ```ts
   * const channel = await client.contacts.channels.update(
   *   'channelId',
   *   { contactId: 'contactId' },
   * );
   * ```
   */
  update(
    channelID: string,
    params: ChannelUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ChannelUpdateResponse> {
    const { contactId, ...body } = params;
    return this._client.patch(path`/v1/contacts/${contactId}/channels/${channelID}`, { body, ...options });
  }

  /**
   * Add a new communication channel to an existing contact.
   *
   * @example
   * ```ts
   * const response = await client.contacts.channels.add(
   *   'contactId',
   *   {
   *     channel: 'email',
   *     identifier: 'john.work@company.com',
   *     label: 'work',
   *   },
   * );
   * ```
   */
  add(contactID: string, body: ChannelAddParams, options?: RequestOptions): APIPromise<ChannelAddResponse> {
    return this._client.post(path`/v1/contacts/${contactID}/channels`, { body, ...options });
  }

  /**
   * Remove a communication channel from a contact. Cannot remove the last channel.
   *
   * @example
   * ```ts
   * await client.contacts.channels.remove('channelId', {
   *   contactId: 'contactId',
   * });
   * ```
   */
  remove(channelID: string, params: ChannelRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { contactId } = params;
    return this._client.delete(path`/v1/contacts/${contactId}/channels/${channelID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Set a channel as the primary channel for its type.
   *
   * @example
   * ```ts
   * const response = await client.contacts.channels.setPrimary(
   *   'channelId',
   *   { contactId: 'contactId' },
   * );
   * ```
   */
  setPrimary(
    channelID: string,
    params: ChannelSetPrimaryParams,
    options?: RequestOptions,
  ): APIPromise<ChannelSetPrimaryResponse> {
    const { contactId } = params;
    return this._client.post(path`/v1/contacts/${contactId}/channels/${channelID}/primary`, options);
  }
}

export interface ChannelUpdateResponse {
  /**
   * A communication channel for a contact.
   */
  channel: ContactsAPI.ContactChannel;
}

export interface ChannelAddResponse {
  /**
   * A communication channel for a contact.
   */
  channel: ContactsAPI.ContactChannel;
}

export interface ChannelSetPrimaryResponse {
  /**
   * A communication channel for a contact.
   */
  channel: ContactsAPI.ContactChannel;
}

export interface ChannelUpdateParams {
  /**
   * Path param
   */
  contactId: string;

  /**
   * Body param: Optional label for the channel. Set to null to clear.
   */
  label?: string | null;

  /**
   * Body param
   */
  metadata?: { [key: string]: string };

  /**
   * Body param: Whether the channel is verified.
   */
  verified?: boolean;
}

export interface ChannelAddParams {
  /**
   * Channel type.
   */
  channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice';

  /**
   * Channel identifier (phone number in E.164 format or email address).
   */
  identifier: string;

  /**
   * ISO country code for phone numbers.
   */
  countryCode?: string;

  /**
   * Whether this should be the primary channel for its type.
   */
  isPrimary?: boolean;

  /**
   * Optional label for the channel.
   */
  label?: string;
}

export interface ChannelRemoveParams {
  contactId: string;
}

export interface ChannelSetPrimaryParams {
  contactId: string;
}

export declare namespace Channels {
  export {
    type ChannelUpdateResponse as ChannelUpdateResponse,
    type ChannelAddResponse as ChannelAddResponse,
    type ChannelSetPrimaryResponse as ChannelSetPrimaryResponse,
    type ChannelUpdateParams as ChannelUpdateParams,
    type ChannelAddParams as ChannelAddParams,
    type ChannelRemoveParams as ChannelRemoveParams,
    type ChannelSetPrimaryParams as ChannelSetPrimaryParams,
  };
}
