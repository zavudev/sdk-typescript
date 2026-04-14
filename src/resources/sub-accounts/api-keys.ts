// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class APIKeys extends APIResource {
  /**
   * Create sub-account API key
   *
   * @example
   * ```ts
   * const apiKey = await client.subAccounts.apiKeys.create(
   *   'id',
   *   { name: 'Production Key', environment: 'live' },
   * );
   * ```
   */
  create(id: string, body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKeyCreateResponse> {
    return this._client.post(path`/v1/sub-accounts/${id}/api-keys`, { body, ...options });
  }

  /**
   * List sub-account API keys
   *
   * @example
   * ```ts
   * const apiKeys = await client.subAccounts.apiKeys.list('id');
   * ```
   */
  list(id: string, options?: RequestOptions): APIPromise<APIKeyListResponse> {
    return this._client.get(path`/v1/sub-accounts/${id}/api-keys`, options);
  }

  /**
   * Revoke sub-account API key
   *
   * @example
   * ```ts
   * await client.subAccounts.apiKeys.revoke('keyId', {
   *   id: 'id',
   * });
   * ```
   */
  revoke(keyID: string, params: APIKeyRevokeParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/v1/sub-accounts/${id}/api-keys/${keyID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface APIKeyCreateResponse {
  apiKey: APIKeyCreateResponse.APIKey;
}

export namespace APIKeyCreateResponse {
  export interface APIKey {
    id: string;

    environment: 'live' | 'test';

    key: string;

    name: string;
  }
}

export interface APIKeyListResponse {
  items: Array<APIKeyListResponse.Item>;
}

export namespace APIKeyListResponse {
  export interface Item {
    id: string;

    createdAt: number;

    environment: 'live' | 'test';

    /**
     * First characters of the key for identification.
     */
    keyPrefix: string;

    name: string;

    /**
     * Full API key. Only returned on creation.
     */
    key?: string;

    lastUsedAt?: number | null;

    permissions?: Array<string>;

    revokedAt?: number | null;
  }
}

export interface APIKeyCreateParams {
  name: string;

  environment?: 'live' | 'test';

  permissions?: Array<string>;
}

export interface APIKeyRevokeParams {
  /**
   * Sub-account ID.
   */
  id: string;
}

export declare namespace APIKeys {
  export {
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyRevokeParams as APIKeyRevokeParams,
  };
}
