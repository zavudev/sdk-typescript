// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class URLs extends APIResource {
  /**
   * List URLs that have been verified for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const verifiedURL of client.urls.listVerified()) {
   *   // ...
   * }
   * ```
   */
  listVerified(
    query: URLListVerifiedParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VerifiedURLsCursor, VerifiedURL> {
    return this._client.getAPIList('/v1/urls', Cursor<VerifiedURL>, { query, ...options });
  }

  /**
   * Get details of a specific verified URL.
   *
   * @example
   * ```ts
   * const response = await client.urls.retrieveDetails('urlId');
   * ```
   */
  retrieveDetails(urlID: string, options?: RequestOptions): APIPromise<URLRetrieveDetailsResponse> {
    return this._client.get(path`/v1/urls/${urlID}`, options);
  }

  /**
   * Submit a URL for verification. URLs are automatically checked against Google Web
   * Risk API. Safe URLs are auto-approved, malicious URLs are blocked. URL
   * shorteners (bit.ly, t.co, etc.) are always blocked.
   *
   * **Important:** All SMS and Email messages containing URLs require those URLs to
   * be verified before the message can be sent. This endpoint allows
   * pre-verification of URLs.
   *
   * @example
   * ```ts
   * const response = await client.urls.submitForVerification({
   *   url: 'https://example.com/page',
   * });
   * ```
   */
  submitForVerification(
    body: URLSubmitForVerificationParams,
    options?: RequestOptions,
  ): APIPromise<URLSubmitForVerificationResponse> {
    return this._client.post('/v1/urls', { body, ...options });
  }
}

export type VerifiedURLsCursor = Cursor<VerifiedURL>;

export interface VerifiedURL {
  id: string;

  createdAt: string;

  /**
   * Domain extracted from the URL.
   */
  domain: string;

  /**
   * Status of a verified URL.
   */
  status: 'pending' | 'approved' | 'rejected' | 'malicious';

  /**
   * The verified URL.
   */
  url: string;

  /**
   * How the URL was approved or rejected.
   */
  approvalType?: 'manual' | 'auto_web_risk';

  updatedAt?: string;
}

export interface URLRetrieveDetailsResponse {
  url: VerifiedURL;
}

export interface URLSubmitForVerificationResponse {
  url: VerifiedURL;
}

export interface URLListVerifiedParams extends CursorParams {
  /**
   * Filter by verification status.
   */
  status?: 'pending' | 'approved' | 'rejected' | 'malicious';
}

export interface URLSubmitForVerificationParams {
  /**
   * The URL to submit for verification.
   */
  url: string;
}

export declare namespace URLs {
  export {
    type VerifiedURL as VerifiedURL,
    type URLRetrieveDetailsResponse as URLRetrieveDetailsResponse,
    type URLSubmitForVerificationResponse as URLSubmitForVerificationResponse,
    type VerifiedURLsCursor as VerifiedURLsCursor,
    type URLListVerifiedParams as URLListVerifiedParams,
    type URLSubmitForVerificationParams as URLSubmitForVerificationParams,
  };
}
