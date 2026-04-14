// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChannelsAPI from './channels';
import {
  ChannelAddParams,
  ChannelAddResponse,
  ChannelRemoveParams,
  ChannelSetPrimaryParams,
  ChannelSetPrimaryResponse,
  ChannelUpdateParams,
  ChannelUpdateResponse,
  Channels,
} from './channels';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Contacts extends APIResource {
  channels: ChannelsAPI.Channels = new ChannelsAPI.Channels(this._client);

  /**
   * Create a new contact with one or more communication channels.
   *
   * @example
   * ```ts
   * const contact = await client.contacts.create({
   *   channels: [
   *     {
   *       channel: 'sms',
   *       identifier: '+14155551234',
   *       isPrimary: true,
   *     },
   *   ],
   *   displayName: 'John Doe',
   * });
   * ```
   */
  create(body: ContactCreateParams, options?: RequestOptions): APIPromise<Contact> {
    return this._client.post('/v1/contacts', { body, ...options });
  }

  /**
   * Get contact
   *
   * @example
   * ```ts
   * const contact = await client.contacts.retrieve('contactId');
   * ```
   */
  retrieve(contactID: string, options?: RequestOptions): APIPromise<Contact> {
    return this._client.get(path`/v1/contacts/${contactID}`, options);
  }

  /**
   * Update contact
   *
   * @example
   * ```ts
   * const contact = await client.contacts.update('contactId');
   * ```
   */
  update(contactID: string, body: ContactUpdateParams, options?: RequestOptions): APIPromise<Contact> {
    return this._client.patch(path`/v1/contacts/${contactID}`, { body, ...options });
  }

  /**
   * List contacts with their communication channels.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const contact of client.contacts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ContactsCursor, Contact> {
    return this._client.getAPIList('/v1/contacts', Cursor<Contact>, { query, ...options });
  }

  /**
   * Dismiss the merge suggestion for a contact.
   *
   * @example
   * ```ts
   * await client.contacts.dismissMergeSuggestion('contactId');
   * ```
   */
  dismissMergeSuggestion(contactID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/contacts/${contactID}/merge-suggestion`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Merge a source contact into this contact. All channels from the source contact
   * will be moved to the target contact, and the source contact will be marked as
   * merged.
   *
   * @example
   * ```ts
   * const contact = await client.contacts.merge('contactId', {
   *   sourceContactId: 'jx7xyz789',
   * });
   * ```
   */
  merge(contactID: string, body: ContactMergeParams, options?: RequestOptions): APIPromise<Contact> {
    return this._client.post(path`/v1/contacts/${contactID}/merge`, { body, ...options });
  }

  /**
   * Get contact by phone number
   *
   * @example
   * ```ts
   * const contact = await client.contacts.retrieveByPhone(
   *   'phoneNumber',
   * );
   * ```
   */
  retrieveByPhone(phoneNumber: string, options?: RequestOptions): APIPromise<Contact> {
    return this._client.get(path`/v1/contacts/phone/${phoneNumber}`, options);
  }
}

export type ContactsCursor = Cursor<Contact>;

export interface Contact {
  id: string;

  /**
   * List of available messaging channels for this contact.
   */
  availableChannels: Array<string>;

  createdAt: string;

  metadata: { [key: string]: string };

  /**
   * Whether this contact has been verified.
   */
  verified: boolean;

  /**
   * All communication channels for this contact.
   */
  channels?: Array<ContactChannel>;

  countryCode?: string;

  /**
   * Preferred channel for this contact.
   */
  defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice';

  /**
   * Display name for the contact.
   */
  displayName?: string;

  /**
   * DEPRECATED: Use primaryPhone instead. Primary phone number in E.164 format.
   */
  phoneNumber?: string;

  /**
   * Primary email address.
   */
  primaryEmail?: string;

  /**
   * Primary phone number in E.164 format.
   */
  primaryPhone?: string;

  /**
   * Contact's WhatsApp profile name. Only available for WhatsApp contacts.
   */
  profileName?: string | null;

  /**
   * ID of a contact suggested for merging.
   */
  suggestedMergeWith?: string;

  updatedAt?: string;
}

/**
 * A communication channel for a contact.
 */
export interface ContactChannel {
  id: string;

  /**
   * Channel type.
   */
  channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice';

  createdAt: string;

  /**
   * Channel identifier (phone number or email address).
   */
  identifier: string;

  /**
   * Whether this is the primary channel for its type.
   */
  isPrimary: boolean;

  /**
   * Whether this channel has been verified.
   */
  verified: boolean;

  /**
   * ISO country code for phone numbers.
   */
  countryCode?: string;

  /**
   * Optional label for the channel.
   */
  label?: string;

  /**
   * Last time a message was received on this channel.
   */
  lastInboundAt?: string;

  metadata?: { [key: string]: string };

  /**
   * Delivery metrics for this channel.
   */
  metrics?: ContactChannel.Metrics;

  updatedAt?: string;
}

export namespace ContactChannel {
  /**
   * Delivery metrics for this channel.
   */
  export interface Metrics {
    avgDeliveryTimeMs?: number;

    failureCount?: number;

    lastSuccessAt?: string;

    successCount?: number;

    totalAttempts?: number;
  }
}

export interface ContactCreateParams {
  /**
   * Communication channels for the contact.
   */
  channels: Array<ContactCreateParams.Channel>;

  /**
   * Display name for the contact.
   */
  displayName?: string;

  /**
   * Arbitrary metadata to associate with the contact.
   */
  metadata?: { [key: string]: string };
}

export namespace ContactCreateParams {
  /**
   * Input for creating a contact channel.
   */
  export interface Channel {
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
}

export interface ContactUpdateParams {
  /**
   * Preferred channel for this contact. Set to null to clear.
   */
  defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice' | null;

  metadata?: { [key: string]: string };
}

export interface ContactListParams extends CursorParams {
  phoneNumber?: string;
}

export interface ContactMergeParams {
  /**
   * ID of the contact to merge into the target contact. The source contact will be
   * marked as merged.
   */
  sourceContactId: string;
}

Contacts.Channels = Channels;

export declare namespace Contacts {
  export {
    type Contact as Contact,
    type ContactChannel as ContactChannel,
    type ContactsCursor as ContactsCursor,
    type ContactCreateParams as ContactCreateParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactMergeParams as ContactMergeParams,
  };

  export {
    Channels as Channels,
    type ChannelUpdateResponse as ChannelUpdateResponse,
    type ChannelAddResponse as ChannelAddResponse,
    type ChannelSetPrimaryResponse as ChannelSetPrimaryResponse,
    type ChannelUpdateParams as ChannelUpdateParams,
    type ChannelAddParams as ChannelAddParams,
    type ChannelRemoveParams as ChannelRemoveParams,
    type ChannelSetPrimaryParams as ChannelSetPrimaryParams,
  };
}
