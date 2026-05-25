// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Secrets extends APIResource {
  /**
   * Lists every secret key set on the function. Plaintext is NEVER returned — only
   * the last 4 characters of each value, for visual confirmation.
   *
   * @example
   * ```ts
   * const secrets = await client.functions.secrets.list(
   *   'functionId',
   * );
   * ```
   */
  list(functionID: string, options?: RequestOptions): APIPromise<SecretListResponse> {
    return this._client.get(path`/v1/functions/${functionID}/secrets`, options);
  }

  /**
   * Create or update a secret on a function. Marks the function out-of-sync; the
   * next `POST /deploy` re-publishes the Lambda with the new env. Keys must match
   * `[A-Z_][A-Z0-9_]*` (uppercase env-var style) and cannot start with reserved
   * prefixes (AWS*, LAMBDA*, etc).
   *
   * @example
   * ```ts
   * const response = await client.functions.secrets.set('key', {
   *   functionId: 'functionId',
   *   value: 'value',
   * });
   * ```
   */
  set(key: string, params: SecretSetParams, options?: RequestOptions): APIPromise<unknown> {
    const { functionId, ...body } = params;
    return this._client.put(path`/v1/functions/${functionId}/secrets/${key}`, { body, ...options });
  }

  /**
   * Remove a secret from a function. Doesn't take effect on the running Lambda until
   * the next deploy.
   *
   * @example
   * ```ts
   * await client.functions.secrets.unset('key', {
   *   functionId: 'functionId',
   * });
   * ```
   */
  unset(key: string, params: SecretUnsetParams, options?: RequestOptions): APIPromise<void> {
    const { functionId } = params;
    return this._client.delete(path`/v1/functions/${functionId}/secrets/${key}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SecretListResponse {
  secrets: Array<SecretListResponse.Secret>;
}

export namespace SecretListResponse {
  export interface Secret {
    id: string;

    key: string;

    valueLast4: string;

    createdAt?: number;

    syncedToAws?: boolean;

    updatedAt?: number;
  }
}

export type SecretSetResponse = unknown;

export interface SecretSetParams {
  /**
   * Path param: Zavu Function ID.
   */
  functionId: string;

  /**
   * Body param
   */
  value: string;
}

export interface SecretUnsetParams {
  /**
   * Zavu Function ID.
   */
  functionId: string;
}

export declare namespace Secrets {
  export {
    type SecretListResponse as SecretListResponse,
    type SecretSetResponse as SecretSetResponse,
    type SecretSetParams as SecretSetParams,
    type SecretUnsetParams as SecretUnsetParams,
  };
}
