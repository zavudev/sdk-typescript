// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Contacts extends APIResource {
  /**
   * Get contact
   */
  retrieve(contactID: string, options?: RequestOptions): APIPromise<Contact> {
    return this._client.get(path`/v1/contacts/${contactID}`, options);
  }

  /**
   * Update contact
   */
  update(contactID: string, body: ContactUpdateParams, options?: RequestOptions): APIPromise<Contact> {
    return this._client.patch(path`/v1/contacts/${contactID}`, { body, ...options });
  }

  /**
   * List contacts with their communication channels.
   */
  list(
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ContactsCursor, Contact> {
    return this._client.getAPIList('/v1/contacts', Cursor<Contact>, { query, ...options });
  }

  /**
   * Get contact by phone number
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
  channels?: Array<Contact.Channel>;

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

export namespace Contact {
  /**
   * A communication channel for a contact.
   */
  export interface Channel {
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
    metrics?: Channel.Metrics;

    updatedAt?: string;
  }

  export namespace Channel {
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

export declare namespace Contacts {
  export {
    type Contact as Contact,
    type ContactsCursor as ContactsCursor,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
  };
}
