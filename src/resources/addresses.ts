// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Addresses extends APIResource {
  /**
   * Create a regulatory address for phone number purchases. Some countries require a
   * verified address before phone numbers can be activated.
   *
   * @example
   * ```ts
   * const address = await client.addresses.create({
   *   countryCode: 'DE',
   *   locality: 'Berlin',
   *   postalCode: '10115',
   *   streetAddress: '123 Main St',
   *   firstName: 'John',
   *   lastName: 'Doe',
   * });
   * ```
   */
  create(body: AddressCreateParams, options?: RequestOptions): APIPromise<AddressCreateResponse> {
    return this._client.post('/v1/addresses', { body, ...options });
  }

  /**
   * Get a specific regulatory address.
   *
   * @example
   * ```ts
   * const address = await client.addresses.retrieve(
   *   'addressId',
   * );
   * ```
   */
  retrieve(addressID: string, options?: RequestOptions): APIPromise<AddressRetrieveResponse> {
    return this._client.get(path`/v1/addresses/${addressID}`, options);
  }

  /**
   * List regulatory addresses for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const address of client.addresses.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AddressListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AddressesCursor, Address> {
    return this._client.getAPIList('/v1/addresses', Cursor<Address>, { query, ...options });
  }

  /**
   * Delete a regulatory address. Cannot delete addresses that are in use.
   *
   * @example
   * ```ts
   * await client.addresses.delete('addressId');
   * ```
   */
  delete(addressID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/addresses/${addressID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AddressesCursor = Cursor<Address>;

/**
 * A regulatory address for phone number requirements.
 */
export interface Address {
  id: string;

  countryCode: string;

  createdAt: string;

  locality: string;

  postalCode: string;

  status: AddressStatus;

  streetAddress: string;

  administrativeArea?: string | null;

  businessName?: string | null;

  extendedAddress?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  updatedAt?: string;
}

export type AddressStatus = 'pending' | 'verified' | 'rejected';

export interface AddressCreateResponse {
  /**
   * A regulatory address for phone number requirements.
   */
  address: Address;
}

export interface AddressRetrieveResponse {
  /**
   * A regulatory address for phone number requirements.
   */
  address: Address;
}

export interface AddressCreateParams {
  countryCode: string;

  locality: string;

  postalCode: string;

  streetAddress: string;

  administrativeArea?: string;

  businessName?: string;

  extendedAddress?: string;

  firstName?: string;

  lastName?: string;
}

export interface AddressListParams extends CursorParams {}

export declare namespace Addresses {
  export {
    type Address as Address,
    type AddressStatus as AddressStatus,
    type AddressCreateResponse as AddressCreateResponse,
    type AddressRetrieveResponse as AddressRetrieveResponse,
    type AddressesCursor as AddressesCursor,
    type AddressCreateParams as AddressCreateParams,
    type AddressListParams as AddressListParams,
  };
}
