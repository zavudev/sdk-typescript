// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
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
   * List contacts
   */
  list(
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListResponse> {
    return this._client.get('/v1/contacts', { query, ...options });
  }

  /**
   * Get contact by phone number
   */
  retrieveByPhone(phoneNumber: string, options?: RequestOptions): APIPromise<Contact> {
    return this._client.get(path`/v1/contacts/phone/${phoneNumber}`, options);
  }
}

export interface Contact {
  id: string;

  /**
   * E.164 phone number.
   */
  phoneNumber: string;

  /**
   * List of available messaging channels for this contact.
   */
  availableChannels?: Array<string>;

  countryCode?: string;

  createdAt?: string;

  /**
   * Preferred channel for this contact.
   */
  defaultChannel?: 'sms' | 'whatsapp' | 'email';

  metadata?: { [key: string]: string };

  updatedAt?: string;

  /**
   * Whether this contact has been verified.
   */
  verified?: boolean;
}

export interface ContactListResponse {
  items: Array<Contact>;

  nextCursor?: string | null;
}

export interface ContactUpdateParams {
  /**
   * Preferred channel for this contact. Set to null to clear.
   */
  defaultChannel?: 'sms' | 'whatsapp' | 'email' | null;

  metadata?: { [key: string]: string };
}

export interface ContactListParams {
  cursor?: string;

  limit?: number;

  phoneNumber?: string;
}

export declare namespace Contacts {
  export {
    type Contact as Contact,
    type ContactListResponse as ContactListResponse,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
  };
}
