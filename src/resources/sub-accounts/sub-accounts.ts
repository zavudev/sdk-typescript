// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from './api-keys';
import {
  APIKeyCreateParams,
  APIKeyCreateResponse,
  APIKeyListResponse,
  APIKeyRevokeParams,
  APIKeys,
} from './api-keys';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class SubAccounts extends APIResource {
  apiKeys: APIKeysAPI.APIKeys = new APIKeysAPI.APIKeys(this._client);

  /**
   * Create a new sub-account (project) with its own API key. All charges are billed
   * to the parent team's balance. Use creditLimit to set a spending cap. The
   * sub-account's API key is returned only in the creation response.
   *
   * @example
   * ```ts
   * const subAccount = await client.subAccounts.create({
   *   name: 'Client ABC',
   * });
   * ```
   */
  create(body: SubAccountCreateParams, options?: RequestOptions): APIPromise<SubAccountCreateResponse> {
    return this._client.post('/v1/sub-accounts', { body, ...options });
  }

  /**
   * Get sub-account
   *
   * @example
   * ```ts
   * const subAccount = await client.subAccounts.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<SubAccountRetrieveResponse> {
    return this._client.get(path`/v1/sub-accounts/${id}`, options);
  }

  /**
   * Update sub-account
   *
   * @example
   * ```ts
   * const subAccount = await client.subAccounts.update('id');
   * ```
   */
  update(
    id: string,
    body: SubAccountUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SubAccountUpdateResponse> {
    return this._client.patch(path`/v1/sub-accounts/${id}`, { body, ...options });
  }

  /**
   * List sub-accounts for this team.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const subAccount of client.subAccounts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SubAccountListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SubAccountsCursor, SubAccount> {
    return this._client.getAPIList('/v1/sub-accounts', Cursor<SubAccount>, { query, ...options });
  }

  /**
   * Deactivate a sub-account. Remaining balance is returned to the parent team and
   * all API keys are revoked.
   *
   * @example
   * ```ts
   * const response = await client.subAccounts.deactivate('id');
   * ```
   */
  deactivate(id: string, options?: RequestOptions): APIPromise<SubAccountDeactivateResponse> {
    return this._client.delete(path`/v1/sub-accounts/${id}`, options);
  }

  /**
   * Get spending information for a sub-account. Returns the parent team's balance,
   * the sub-account's total spending, and its credit limit (spending cap).
   *
   * @example
   * ```ts
   * const response = await client.subAccounts.getBalance('id');
   * ```
   */
  getBalance(id: string, options?: RequestOptions): APIPromise<SubAccountGetBalanceResponse> {
    return this._client.get(path`/v1/sub-accounts/${id}/balance`, options);
  }
}

export type SubAccountsCursor = Cursor<SubAccount>;

export interface SubAccount {
  id: string;

  createdAt: string;

  name: string;

  status: 'active' | 'inactive';

  /**
   * Total amount spent by this sub-account in cents.
   */
  totalSpent: number;

  /**
   * API key for the sub-account. Only returned on creation.
   */
  apiKey?: string;

  /**
   * Spending cap in cents. When reached, messages from this sub-account will be
   * blocked.
   */
  creditLimit?: number | null;

  /**
   * External reference ID set by the parent account.
   */
  externalId?: string | null;

  metadata?: { [key: string]: unknown } | null;
}

export interface SubAccountCreateResponse {
  subAccount: SubAccount;
}

export interface SubAccountRetrieveResponse {
  subAccount: SubAccount;
}

export interface SubAccountUpdateResponse {
  subAccount: SubAccount;
}

export interface SubAccountDeactivateResponse {
  /**
   * Number of API keys revoked.
   */
  keysRevoked: number;

  message: string;
}

export interface SubAccountGetBalanceResponse {
  /**
   * Team balance in cents. All charges are billed to the parent team.
   */
  balance: number;

  currency: string;

  /**
   * Spending cap in cents (only for sub-accounts).
   */
  creditLimit?: number | null;

  /**
   * Whether this API key belongs to a sub-account.
   */
  isSubAccount?: boolean;

  /**
   * Total amount spent by this sub-account in cents (only for sub-accounts).
   */
  totalSpent?: number | null;
}

export interface SubAccountCreateParams {
  /**
   * Name of the sub-account.
   */
  name: string;

  /**
   * Spending cap in cents. When reached, messages from this sub-account will be
   * blocked. Omit or set to 0 for no limit.
   */
  creditLimit?: number;

  /**
   * External reference ID for your own tracking.
   */
  externalId?: string;

  metadata?: { [key: string]: unknown };
}

export interface SubAccountUpdateParams {
  creditLimit?: number | null;

  externalId?: string;

  metadata?: { [key: string]: unknown };

  name?: string;

  status?: 'active' | 'inactive';
}

export interface SubAccountListParams extends CursorParams {}

SubAccounts.APIKeys = APIKeys;

export declare namespace SubAccounts {
  export {
    type SubAccount as SubAccount,
    type SubAccountCreateResponse as SubAccountCreateResponse,
    type SubAccountRetrieveResponse as SubAccountRetrieveResponse,
    type SubAccountUpdateResponse as SubAccountUpdateResponse,
    type SubAccountDeactivateResponse as SubAccountDeactivateResponse,
    type SubAccountGetBalanceResponse as SubAccountGetBalanceResponse,
    type SubAccountsCursor as SubAccountsCursor,
    type SubAccountCreateParams as SubAccountCreateParams,
    type SubAccountUpdateParams as SubAccountUpdateParams,
    type SubAccountListParams as SubAccountListParams,
  };

  export {
    APIKeys as APIKeys,
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyRevokeParams as APIKeyRevokeParams,
  };
}
