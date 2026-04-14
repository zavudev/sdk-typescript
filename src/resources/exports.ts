// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Exports extends APIResource {
  /**
   * Create a new data export job. The export will be processed asynchronously and
   * the download URL will be available when status is 'completed'. Export links
   * expire after 24 hours.
   *
   * @example
   * ```ts
   * const _export = await client.exports.create({
   *   dataTypes: ['messages', 'conversations'],
   *   dateFrom: '2024-01-01T00:00:00Z',
   *   dateTo: '2024-12-31T23:59:59Z',
   * });
   * ```
   */
  create(body: ExportCreateParams, options?: RequestOptions): APIPromise<ExportCreateResponse> {
    return this._client.post('/v1/exports', { body, ...options });
  }

  /**
   * Get details of a specific data export, including download URL when completed.
   *
   * @example
   * ```ts
   * const _export = await client.exports.retrieve('exportId');
   * ```
   */
  retrieve(exportID: string, options?: RequestOptions): APIPromise<ExportRetrieveResponse> {
    return this._client.get(path`/v1/exports/${exportID}`, options);
  }

  /**
   * List data exports for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dataExport of client.exports.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExportListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DataExportsCursor, DataExport> {
    return this._client.getAPIList('/v1/exports', Cursor<DataExport>, { query, ...options });
  }
}

export type DataExportsCursor = Cursor<DataExport>;

export interface DataExport {
  id: string;

  createdAt: string;

  dataTypes: Array<'messages' | 'conversations' | 'webhookDeliveries' | 'agentExecutions' | 'activities'>;

  /**
   * When the export download link expires (24 hours after creation).
   */
  expiresAt: string;

  /**
   * Status of a data export job.
   */
  status: 'pending' | 'processing' | 'completed' | 'failed';

  completedAt?: string | null;

  dateFrom?: string | null;

  dateTo?: string | null;

  /**
   * URL to download the export file. Only available when status is 'completed'.
   */
  downloadUrl?: string | null;

  /**
   * Error message if the export failed.
   */
  errorMessage?: string | null;

  /**
   * Size of the export file in bytes.
   */
  fileSize?: number | null;
}

export interface ExportCreateResponse {
  export: DataExport;
}

export interface ExportRetrieveResponse {
  export: DataExport;
}

export interface ExportCreateParams {
  /**
   * List of data types to include in the export.
   */
  dataTypes: Array<'messages' | 'conversations' | 'webhookDeliveries' | 'agentExecutions' | 'activities'>;

  /**
   * Start date for data to export (inclusive).
   */
  dateFrom?: string;

  /**
   * End date for data to export (inclusive).
   */
  dateTo?: string;
}

export interface ExportListParams extends CursorParams {
  /**
   * Status of a data export job.
   */
  status?: 'pending' | 'processing' | 'completed' | 'failed';
}

export declare namespace Exports {
  export {
    type DataExport as DataExport,
    type ExportCreateResponse as ExportCreateResponse,
    type ExportRetrieveResponse as ExportRetrieveResponse,
    type DataExportsCursor as DataExportsCursor,
    type ExportCreateParams as ExportCreateParams,
    type ExportListParams as ExportListParams,
  };
}
