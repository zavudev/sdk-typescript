// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class RegulatoryDocuments extends APIResource {
  /**
   * Create a regulatory document record after uploading the file. Use the upload-url
   * endpoint first to get an upload URL.
   *
   * @example
   * ```ts
   * const regulatoryDocument =
   *   await client.regulatoryDocuments.create({
   *     documentType: 'passport',
   *     fileSize: 102400,
   *     mimeType: 'image/jpeg',
   *     name: 'Passport Scan',
   *     storageId: 'kg2abc123...',
   *   });
   * ```
   */
  create(
    body: RegulatoryDocumentCreateParams,
    options?: RequestOptions,
  ): APIPromise<RegulatoryDocumentCreateResponse> {
    return this._client.post('/v1/documents', { body, ...options });
  }

  /**
   * Get a specific regulatory document.
   *
   * @example
   * ```ts
   * const regulatoryDocument =
   *   await client.regulatoryDocuments.retrieve('documentId');
   * ```
   */
  retrieve(documentID: string, options?: RequestOptions): APIPromise<RegulatoryDocumentRetrieveResponse> {
    return this._client.get(path`/v1/documents/${documentID}`, options);
  }

  /**
   * List regulatory documents for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const regulatoryDocument of client.regulatoryDocuments.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: RegulatoryDocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RegulatoryDocumentsCursor, RegulatoryDocument> {
    return this._client.getAPIList('/v1/documents', Cursor<RegulatoryDocument>, { query, ...options });
  }

  /**
   * Delete a regulatory document. Cannot delete verified documents.
   *
   * @example
   * ```ts
   * await client.regulatoryDocuments.delete('documentId');
   * ```
   */
  delete(documentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/documents/${documentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get a presigned URL to upload a document file. After uploading, use the
   * storageId to create the document record.
   *
   * @example
   * ```ts
   * const response =
   *   await client.regulatoryDocuments.uploadURL();
   * ```
   */
  uploadURL(options?: RequestOptions): APIPromise<RegulatoryDocumentUploadURLResponse> {
    return this._client.post('/v1/documents/upload-url', options);
  }
}

export type RegulatoryDocumentsCursor = Cursor<RegulatoryDocument>;

/**
 * A regulatory document for phone number requirements.
 */
export interface RegulatoryDocument {
  id: string;

  createdAt: string;

  documentType:
    | 'passport'
    | 'national_id'
    | 'drivers_license'
    | 'utility_bill'
    | 'tax_id'
    | 'business_registration'
    | 'proof_of_address'
    | 'other';

  name: string;

  status: 'pending' | 'uploaded' | 'verified' | 'rejected';

  fileSize?: number;

  mimeType?: string;

  rejectionReason?: string | null;

  updatedAt?: string;
}

export interface RegulatoryDocumentCreateResponse {
  /**
   * A regulatory document for phone number requirements.
   */
  document: RegulatoryDocument;
}

export interface RegulatoryDocumentRetrieveResponse {
  /**
   * A regulatory document for phone number requirements.
   */
  document: RegulatoryDocument;
}

export interface RegulatoryDocumentUploadURLResponse {
  /**
   * Pre-signed URL for uploading the file.
   */
  uploadUrl: string;
}

export interface RegulatoryDocumentCreateParams {
  documentType:
    | 'passport'
    | 'national_id'
    | 'drivers_license'
    | 'utility_bill'
    | 'tax_id'
    | 'business_registration'
    | 'proof_of_address'
    | 'other';

  fileSize: number;

  mimeType: string;

  name: string;

  /**
   * Storage ID from the upload-url endpoint.
   */
  storageId: string;
}

export interface RegulatoryDocumentListParams extends CursorParams {}

export declare namespace RegulatoryDocuments {
  export {
    type RegulatoryDocument as RegulatoryDocument,
    type RegulatoryDocumentCreateResponse as RegulatoryDocumentCreateResponse,
    type RegulatoryDocumentRetrieveResponse as RegulatoryDocumentRetrieveResponse,
    type RegulatoryDocumentUploadURLResponse as RegulatoryDocumentUploadURLResponse,
    type RegulatoryDocumentsCursor as RegulatoryDocumentsCursor,
    type RegulatoryDocumentCreateParams as RegulatoryDocumentCreateParams,
    type RegulatoryDocumentListParams as RegulatoryDocumentListParams,
  };
}
