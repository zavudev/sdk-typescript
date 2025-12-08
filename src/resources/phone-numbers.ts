// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PhoneNumbers extends APIResource {
  /**
   * Get details of a specific phone number.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumbers.retrieve(
   *   'phoneNumberId',
   * );
   * ```
   */
  retrieve(phoneNumberID: string, options?: RequestOptions): APIPromise<PhoneNumberRetrieveResponse> {
    return this._client.get(path`/v1/phone-numbers/${phoneNumberID}`, options);
  }

  /**
   * Update a phone number's name or sender assignment.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumbers.update(
   *   'phoneNumberId',
   *   { name: 'Support Line' },
   * );
   * ```
   */
  update(
    phoneNumberID: string,
    body: PhoneNumberUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberUpdateResponse> {
    return this._client.patch(path`/v1/phone-numbers/${phoneNumberID}`, { body, ...options });
  }

  /**
   * List all phone numbers owned by this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ownedPhoneNumber of client.phoneNumbers.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PhoneNumberListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OwnedPhoneNumbersCursor, OwnedPhoneNumber> {
    return this._client.getAPIList('/v1/phone-numbers', Cursor<OwnedPhoneNumber>, { query, ...options });
  }

  /**
   * Purchase an available phone number. The first US phone number is free for each
   * team.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumbers.purchase({
   *   phoneNumber: '+15551234567',
   *   name: 'Primary Line',
   * });
   * ```
   */
  purchase(
    body: PhoneNumberPurchaseParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberPurchaseResponse> {
    return this._client.post('/v1/phone-numbers', { body, ...options });
  }

  /**
   * Release a phone number. The phone number must not be assigned to a sender.
   *
   * @example
   * ```ts
   * await client.phoneNumbers.release('phoneNumberId');
   * ```
   */
  release(phoneNumberID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/phone-numbers/${phoneNumberID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Search for available phone numbers to purchase by country and type.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumbers.searchAvailable({
   *   countryCode: 'xx',
   * });
   * ```
   */
  searchAvailable(
    query: PhoneNumberSearchAvailableParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberSearchAvailableResponse> {
    return this._client.get('/v1/phone-numbers/available', { query, ...options });
  }
}

export type OwnedPhoneNumbersCursor = Cursor<OwnedPhoneNumber>;

export interface AvailablePhoneNumber {
  capabilities: PhoneNumberCapabilities;

  phoneNumber: string;

  pricing: PhoneNumberPricing;

  friendlyName?: string;

  locality?: string;

  region?: string;
}

export interface OwnedPhoneNumber {
  id: string;

  capabilities: Array<string>;

  createdAt: string;

  phoneNumber: string;

  pricing: OwnedPhoneNumberPricing;

  status: PhoneNumberStatus;

  /**
   * Optional custom name for the phone number.
   */
  name?: string;

  nextRenewalDate?: string;

  /**
   * Sender ID if the phone number is assigned to a sender.
   */
  senderId?: string;

  updatedAt?: string;
}

export interface OwnedPhoneNumberPricing {
  /**
   * Whether this is a free number.
   */
  isFreeNumber?: boolean;

  /**
   * Monthly cost in cents.
   */
  monthlyCost?: number;

  /**
   * Monthly price in USD.
   */
  monthlyPrice?: number;

  /**
   * One-time purchase cost in cents.
   */
  upfrontCost?: number;
}

export interface PhoneNumberCapabilities {
  mms?: boolean;

  sms?: boolean;

  voice?: boolean;
}

export interface PhoneNumberPricing {
  /**
   * Whether this number qualifies for the free first US number offer.
   */
  isFreeEligible?: boolean;

  /**
   * Monthly price in USD.
   */
  monthlyPrice?: number;

  /**
   * One-time purchase price in USD.
   */
  upfrontPrice?: number;
}

export type PhoneNumberStatus = 'active' | 'suspended' | 'pending';

export type PhoneNumberType = 'local' | 'mobile' | 'tollFree';

export interface PhoneNumberRetrieveResponse {
  phoneNumber: OwnedPhoneNumber;
}

export interface PhoneNumberUpdateResponse {
  phoneNumber: OwnedPhoneNumber;
}

export interface PhoneNumberPurchaseResponse {
  phoneNumber: OwnedPhoneNumber;
}

export interface PhoneNumberSearchAvailableResponse {
  items: Array<AvailablePhoneNumber>;
}

export interface PhoneNumberUpdateParams {
  /**
   * Custom name for the phone number. Set to null to clear.
   */
  name?: string | null;

  /**
   * Sender ID to assign the phone number to. Set to null to unassign.
   */
  senderId?: string | null;
}

export interface PhoneNumberListParams extends CursorParams {
  /**
   * Filter by phone number status.
   */
  status?: PhoneNumberStatus;
}

export interface PhoneNumberPurchaseParams {
  /**
   * Phone number in E.164 format.
   */
  phoneNumber: string;

  /**
   * Optional custom name for the phone number.
   */
  name?: string;
}

export interface PhoneNumberSearchAvailableParams {
  /**
   * Two-letter ISO country code.
   */
  countryCode: string;

  /**
   * Search for numbers containing this string.
   */
  contains?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;

  /**
   * Type of phone number to search for.
   */
  type?: PhoneNumberType;
}

export declare namespace PhoneNumbers {
  export {
    type AvailablePhoneNumber as AvailablePhoneNumber,
    type OwnedPhoneNumber as OwnedPhoneNumber,
    type OwnedPhoneNumberPricing as OwnedPhoneNumberPricing,
    type PhoneNumberCapabilities as PhoneNumberCapabilities,
    type PhoneNumberPricing as PhoneNumberPricing,
    type PhoneNumberStatus as PhoneNumberStatus,
    type PhoneNumberType as PhoneNumberType,
    type PhoneNumberRetrieveResponse as PhoneNumberRetrieveResponse,
    type PhoneNumberUpdateResponse as PhoneNumberUpdateResponse,
    type PhoneNumberPurchaseResponse as PhoneNumberPurchaseResponse,
    type PhoneNumberSearchAvailableResponse as PhoneNumberSearchAvailableResponse,
    type OwnedPhoneNumbersCursor as OwnedPhoneNumbersCursor,
    type PhoneNumberUpdateParams as PhoneNumberUpdateParams,
    type PhoneNumberListParams as PhoneNumberListParams,
    type PhoneNumberPurchaseParams as PhoneNumberPurchaseParams,
    type PhoneNumberSearchAvailableParams as PhoneNumberSearchAvailableParams,
  };
}
