// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Brands extends APIResource {
  /**
   * Create a 10DLC brand registration. The brand starts in draft status. Submit it
   * for review using the submit endpoint.
   *
   * @example
   * ```ts
   * const brand = await client.number10dlc.brands.create({
   *   city: 'San Francisco',
   *   country: 'US',
   *   displayName: 'Acme Corp',
   *   email: 'compliance@acme.com',
   *   entityType: 'PRIVATE_PROFIT',
   *   phone: '+14155551234',
   *   postalCode: '94102',
   *   state: 'CA',
   *   street: '123 Main St',
   *   vertical: 'Technology',
   *   companyName: 'Acme Corporation',
   *   ein: '12-3456789',
   *   website: 'https://acme.com',
   * });
   * ```
   */
  create(body: BrandCreateParams, options?: RequestOptions): APIPromise<BrandCreateResponse> {
    return this._client.post('/v1/10dlc/brands', { body, ...options });
  }

  /**
   * Get 10DLC brand
   *
   * @example
   * ```ts
   * const brand = await client.number10dlc.brands.retrieve(
   *   'brandId',
   * );
   * ```
   */
  retrieve(brandID: string, options?: RequestOptions): APIPromise<BrandRetrieveResponse> {
    return this._client.get(path`/v1/10dlc/brands/${brandID}`, options);
  }

  /**
   * Update a 10DLC brand in draft status. Cannot update after submission.
   *
   * @example
   * ```ts
   * const brand = await client.number10dlc.brands.update(
   *   'brandId',
   * );
   * ```
   */
  update(
    brandID: string,
    body: BrandUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BrandUpdateResponse> {
    return this._client.patch(path`/v1/10dlc/brands/${brandID}`, { body, ...options });
  }

  /**
   * List 10DLC brand registrations for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tenDlcBrand of client.number10dlc.brands.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: BrandListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TenDlcBrandsCursor, TenDlcBrand> {
    return this._client.getAPIList('/v1/10dlc/brands', Cursor<TenDlcBrand>, { query, ...options });
  }

  /**
   * Delete 10DLC brand
   *
   * @example
   * ```ts
   * await client.number10dlc.brands.delete('brandId');
   * ```
   */
  delete(brandID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/10dlc/brands/${brandID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List available use cases for 10DLC campaign registration.
   *
   * @example
   * ```ts
   * const response =
   *   await client.number10dlc.brands.listUseCases();
   * ```
   */
  listUseCases(options?: RequestOptions): APIPromise<BrandListUseCasesResponse> {
    return this._client.get('/v1/10dlc/brands/use-cases', options);
  }

  /**
   * Submit a draft brand to The Campaign Registry (TCR) for vetting. The brand must
   * be in draft status. A $35 registration fee is charged from your balance.
   *
   * @example
   * ```ts
   * const response = await client.number10dlc.brands.submit(
   *   'brandId',
   * );
   * ```
   */
  submit(brandID: string, options?: RequestOptions): APIPromise<BrandSubmitResponse> {
    return this._client.post(path`/v1/10dlc/brands/${brandID}/submit`, options);
  }

  /**
   * Sync the brand status with the registration provider. Use this to check for
   * approval updates after submission.
   *
   * @example
   * ```ts
   * const response = await client.number10dlc.brands.syncStatus(
   *   'brandId',
   * );
   * ```
   */
  syncStatus(brandID: string, options?: RequestOptions): APIPromise<BrandSyncStatusResponse> {
    return this._client.post(path`/v1/10dlc/brands/${brandID}/sync`, options);
  }
}

export type TenDlcBrandsCursor = Cursor<TenDlcBrand>;

export interface TenDlcBrand {
  id: string;

  city: string;

  /**
   * Two-letter ISO country code.
   */
  country: string;

  createdAt: string;

  /**
   * Display name of the brand.
   */
  displayName: string;

  email: string;

  /**
   * Business entity type for 10DLC brand registration.
   */
  entityType: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'GOVERNMENT' | 'SOLE_PROPRIETOR';

  /**
   * Contact phone number in E.164 format.
   */
  phone: string;

  postalCode: string;

  state: string;

  /**
   * Status of a 10DLC brand registration.
   */
  status: 'draft' | 'pending' | 'verified' | 'rejected';

  street: string;

  updatedAt: string;

  /**
   * Industry vertical.
   */
  vertical: string;

  brandRelationship?: string | null;

  /**
   * Trust score assigned by TCR after vetting.
   */
  brandScore?: number | null;

  /**
   * Legal company name.
   */
  companyName?: string | null;

  /**
   * Employer Identification Number (EIN).
   */
  ein?: string | null;

  /**
   * Reason for rejection, if applicable.
   */
  failureReason?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  stockExchange?: string | null;

  stockSymbol?: string | null;

  submittedAt?: string | null;

  verifiedAt?: string | null;

  website?: string | null;
}

export interface BrandCreateResponse {
  brand: TenDlcBrand;
}

export interface BrandRetrieveResponse {
  brand: TenDlcBrand;
}

export interface BrandUpdateResponse {
  brand: TenDlcBrand;
}

export interface BrandListUseCasesResponse {
  useCases: Array<BrandListUseCasesResponse.UseCase>;
}

export namespace BrandListUseCasesResponse {
  export interface UseCase {
    description?: string;

    name?: string;
  }
}

export interface BrandSubmitResponse {
  brand: TenDlcBrand;
}

export interface BrandSyncStatusResponse {
  brand: TenDlcBrand;
}

export interface BrandCreateParams {
  city: string;

  /**
   * Two-letter ISO country code.
   */
  country: string;

  /**
   * Display name of the brand.
   */
  displayName: string;

  email: string;

  /**
   * Business entity type for 10DLC brand registration.
   */
  entityType: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'GOVERNMENT' | 'SOLE_PROPRIETOR';

  /**
   * Contact phone in E.164 format.
   */
  phone: string;

  postalCode: string;

  state: string;

  street: string;

  /**
   * Industry vertical.
   */
  vertical: string;

  /**
   * Legal company name.
   */
  companyName?: string;

  /**
   * Employer Identification Number (format: XX-XXXXXXX).
   */
  ein?: string;

  firstName?: string;

  lastName?: string;

  stockExchange?: string;

  stockSymbol?: string;

  website?: string;
}

export interface BrandUpdateParams {
  city?: string;

  companyName?: string;

  country?: string;

  displayName?: string;

  ein?: string;

  email?: string;

  /**
   * Business entity type for 10DLC brand registration.
   */
  entityType?: 'PRIVATE_PROFIT' | 'PUBLIC_PROFIT' | 'NON_PROFIT' | 'GOVERNMENT' | 'SOLE_PROPRIETOR';

  firstName?: string;

  lastName?: string;

  phone?: string;

  postalCode?: string;

  state?: string;

  stockExchange?: string;

  stockSymbol?: string;

  street?: string;

  vertical?: string;

  website?: string;
}

export interface BrandListParams extends CursorParams {}

export declare namespace Brands {
  export {
    type TenDlcBrand as TenDlcBrand,
    type BrandCreateResponse as BrandCreateResponse,
    type BrandRetrieveResponse as BrandRetrieveResponse,
    type BrandUpdateResponse as BrandUpdateResponse,
    type BrandListUseCasesResponse as BrandListUseCasesResponse,
    type BrandSubmitResponse as BrandSubmitResponse,
    type BrandSyncStatusResponse as BrandSyncStatusResponse,
    type TenDlcBrandsCursor as TenDlcBrandsCursor,
    type BrandCreateParams as BrandCreateParams,
    type BrandUpdateParams as BrandUpdateParams,
    type BrandListParams as BrandListParams,
  };
}
